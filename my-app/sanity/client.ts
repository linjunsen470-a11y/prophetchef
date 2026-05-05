import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, SANITY_REVALIDATE } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = SANITY_REVALIDATE,
}: {
  query: string;
  params?: Record<string, string | number | boolean>;
  revalidate?: number;
}) {
  return client.fetch<QueryResponse>(query, params, {
    next: { revalidate },
  });
}
