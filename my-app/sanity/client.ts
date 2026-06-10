import { createClient } from "next-sanity";
import type { ClientPerspective } from "next-sanity";
import { defineLive } from "next-sanity/live";
import { apiVersion, dataset, projectId, studioUrl } from "./env";

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
  serverToken: token || false,
  browserToken: false,
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
}) {
  return client
    .withConfig({
      perspective,
      stega,
      useCdn: false,
    })
    .fetch<QueryResponse>(query, params);
}
