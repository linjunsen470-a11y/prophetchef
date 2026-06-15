import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/sanity/client";

const officialDraftMode = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
  }),
});

const previewSecretParam = "sanity-preview-secret";
const previewPathnameParam = "sanity-preview-pathname";
const previewPerspectiveParam = "sanity-preview-perspective";
const perspectiveCookieName = "sanity-preview-perspective";

function isRedirectError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof error.digest === "string" &&
    error.digest.startsWith("NEXT_REDIRECT")
  );
}

function isLocalDevRequest(url: URL) {
  return (
    process.env.NODE_ENV === "development" &&
    (url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "::1")
  );
}

function getSafeRedirectPath(url: URL) {
  const pathname = url.searchParams.get(previewPathnameParam) || "/";
  return pathname.startsWith("/") && !pathname.startsWith("//") ? pathname : "/";
}

async function enableLocalDraftMode(url: URL) {
  const draft = await draftMode();
  draft.enable();

  const perspective = url.searchParams.get(previewPerspectiveParam);
  if (perspective) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: perspectiveCookieName,
      value: perspective,
      httpOnly: true,
      path: "/",
      secure: false,
      sameSite: "lax",
    });
  }

  redirect(getSafeRedirectPath(url));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const hasPreviewSecret = Boolean(url.searchParams.get(previewSecretParam));

  if (isLocalDevRequest(url) && hasPreviewSecret) {
    await enableLocalDraftMode(url);
  }

  try {
    return await officialDraftMode.GET(request);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (!isLocalDevRequest(url) || !hasPreviewSecret) {
      throw error;
    }

    console.warn(
      "Sanity preview secret validation failed in local development. Enabling draft mode without remote validation.",
      error,
    );

    await enableLocalDraftMode(url);
  }
}
