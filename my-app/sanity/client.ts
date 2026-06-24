import { createClient } from "next-sanity";
import type { ClientPerspective } from "next-sanity";
import { defineLive } from "next-sanity/live";
import { draftMode } from "next/headers";
import { apiVersion, dataset, projectId, SANITY_REVALIDATE, studioUrl } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: "published",
  stega: {
    studioUrl,
  },
  useCdn: false,
});

const cdnClient = client.withConfig({ useCdn: true });

const serverToken = process.env.SANITY_API_READ_TOKEN;
const browserToken = process.env.SANITY_API_VIEWER_TOKEN;

export const { SanityLive } = defineLive({
  client,
  serverToken,
  browserToken,
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  perspective,
  stega,
}: {
  query: string;
  params?: Record<string, string | number | boolean>;
  perspective?: Exclude<ClientPerspective, "raw">;
  stega?: boolean;
}): Promise<QueryResponse> {
  let isDraftModeEnabled = false;

  if (perspective === undefined || stega === undefined) {
    const draft = await draftMode();
    isDraftModeEnabled = draft.isEnabled;
  }

  const resolvedPerspective = perspective || (isDraftModeEnabled ? "drafts" : "published");
  const resolvedStega = stega ?? isDraftModeEnabled;
  const shouldUseLocalDraftFallback = process.env.NODE_ENV === "development" && isDraftModeEnabled;

  if (shouldUseLocalDraftFallback) {
    return cdnClient.fetch<QueryResponse>(query, params, {
      perspective: "published",
      stega: resolvedStega,
      next: { revalidate: SANITY_REVALIDATE },
    });
  }

  try {
    return await client.fetch<QueryResponse>(query, params, {
      perspective: resolvedPerspective,
      stega: resolvedStega,
      next: { revalidate: SANITY_REVALIDATE },
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "development" || !isDraftModeEnabled) {
      throw error;
    }

    console.warn(
      "Sanity draft fetch failed in local development. Falling back to published CDN content.",
      error,
    );

    return cdnClient.fetch<QueryResponse>(query, params, {
      perspective: "published",
      stega: false,
      next: { revalidate: SANITY_REVALIDATE },
    });
  }
}
