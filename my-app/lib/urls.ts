const SAFE_URL_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

export function sanitizeHref(href: string | undefined, fallback = "#") {
  if (!href) return fallback;

  const trimmedHref = href.trim();
  if (!trimmedHref) return fallback;

  if (trimmedHref.startsWith("#")) {
    return trimmedHref;
  }

  if (trimmedHref.startsWith("/")) {
    return trimmedHref.startsWith("//") ? fallback : trimmedHref;
  }

  try {
    const url = new URL(trimmedHref);
    return SAFE_URL_PROTOCOLS.has(url.protocol) ? trimmedHref : fallback;
  } catch {
    return fallback;
  }
}
