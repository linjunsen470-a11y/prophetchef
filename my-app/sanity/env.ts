export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3kytazzh";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-05";

export const SANITY_REVALIDATE = process.env.NODE_ENV === "development" ? 5 : 3600;
