export function isSanityImageUrl(src: string | null | undefined) {
  return typeof src === "string" && src.startsWith("https://cdn.sanity.io/images/");
}
