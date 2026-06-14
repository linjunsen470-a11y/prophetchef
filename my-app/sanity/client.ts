import { createClient } from "next-sanity";
import type { ClientPerspective } from "next-sanity";
import { defineLive } from "next-sanity/live";
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

const token = process.env.SANITY_API_READ_TOKEN;

export const { SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
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
  return client.fetch<QueryResponse>(query, params, {
    perspective: perspective || "published",
    stega,
    next: { revalidate: SANITY_REVALIDATE },
  });
}
