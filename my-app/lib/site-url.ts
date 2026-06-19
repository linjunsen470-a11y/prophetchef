const PRIMARY_HOST = "www.prophetchef.com";
const BARE_HOST = "prophetchef.com";

export function normalizeSiteUrl(siteUrl: string) {
  const trimmedUrl = siteUrl.trim().replace(/\/$/, "");

  try {
    const url = new URL(trimmedUrl);
    if (url.hostname === BARE_HOST) {
      url.hostname = PRIMARY_HOST;
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    return trimmedUrl;
  }
}
