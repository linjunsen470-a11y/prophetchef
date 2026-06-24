function requireSanityEnv(name: string, fallback: string) {
  const value = process.env[name]?.trim();
  if (value) return value;

  if (process.env.NODE_ENV === "production") {
    throw new Error(`${name} is required for production Sanity access.`);
  }

  return fallback;
}

export const projectId = requireSanityEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "3kytazzh");
export const dataset = requireSanityEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
export const apiVersion = requireSanityEnv("NEXT_PUBLIC_SANITY_API_VERSION", "2026-05-05");
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333";

export const SANITY_REVALIDATE = process.env.NODE_ENV === "development" ? 5 : 3600;
