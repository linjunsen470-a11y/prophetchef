import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 8 * 1024;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_SUBMIT_TIME_MS = 3000;
const MAX_SUBMIT_AGE_MS = 2 * 60 * 60 * 1000;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const textEncoder = new TextEncoder();

function getBodyByteLength(value: string) {
  return textEncoder.encode(value).byteLength;
}

function pruneExpiredRateLimits(now = Date.now()) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    pruneExpiredRateLimits(now);
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function getString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function getMessage(value: unknown) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, 2000);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function isSuspiciousSubmission(body: Record<string, unknown>) {
  const honeypot = getString(body.website, 256);
  if (honeypot) return true;

  const submittedAt = Number(body.submittedAt);
  if (!Number.isFinite(submittedAt)) return true;

  const age = Date.now() - submittedAt;
  return age < MIN_SUBMIT_TIME_MS || age > MAX_SUBMIT_AGE_MS;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { success: false, message: "Inquiry payload must be JSON." },
        { status: 415 },
      );
    }

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, message: "Inquiry payload is too large." },
        { status: 413 },
      );
    }

    const rawBody = await request.text();
    if (getBodyByteLength(rawBody) > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, message: "Inquiry payload is too large." },
        { status: 413 },
      );
    }

    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many inquiry attempts. Please try again later.",
        },
        { status: 429 },
      );
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid inquiry payload." },
        { status: 400 },
      );
    }
    const name = getString(body.name, 120);
    const email = getString(body.email, 254).toLowerCase();
    const company = getString(body.company, 160);
    const phone = getString(body.phone, 80);
    const message = getMessage(body.message);
    const product = getString(body.product, 180);

    if (isSuspiciousSubmission(body)) {
      return NextResponse.json({
        success: true,
        message:
          "Inquiry received successfully. Our team will contact you soon.",
      });
    }

    // 1. Basic Validation
    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "A valid email is required." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.RESEND_TO_EMAIL;

    // 2. Local / Development Sandbox Mode check
    const isSandbox =
      !apiKey || apiKey === "" || apiKey.startsWith("re_placeholder");

    if (isSandbox) {
      if (process.env.NODE_ENV !== "production") {
        console.log(
          "[Resend Sandbox Mode] Received Inquiry (PII logged in development only):",
          {
            name,
            email,
            company,
            phone,
            product,
            message,
          },
        );
      } else {
        console.log(
          "[Resend Sandbox Mode] Received Inquiry. Successfully validated payload. (PII logging omitted in production)",
        );
      }

      return NextResponse.json({
        success: true,
        message:
          "Inquiry received successfully (Sandbox Mode). Our team will contact you soon.",
      });
    }

    // 3. Verify Recipient Email Configuration
    if (!toEmail) {
      console.error("Inquiry API Error: RESEND_TO_EMAIL is not configured.");
      return NextResponse.json(
        {
          success: false,
          message:
            "Inquiry system configuration error. Please contact us directly.",
        },
        { status: 500 },
      );
    }

    // 4. Send Email via Resend API
    const subject = product
      ? `New Website Product Inquiry: ${product} from ${name}`
      : `New Website Contact Inquiry from ${name}`;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company);
    const safePhone = escapeHtml(phone);
    const safeProduct = escapeHtml(product);
    const safeMessage = escapeHtml(message || "No message provided.");

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
        <h2 style="color: #1e3a5f; border-bottom: 2px solid #f97316; padding-bottom: 8px; margin-top: 0;">New Website Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; width: 120px;">Name:</td>
            <td style="padding: 6px 0;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold;">Email:</td>
            <td style="padding: 6px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
          </tr>
          ${
            company
              ? `
          <tr>
            <td style="padding: 6px 0; font-weight: bold;">Company:</td>
            <td style="padding: 6px 0;">${safeCompany}</td>
          </tr>`
              : ""
          }
          ${
            phone
              ? `
          <tr>
            <td style="padding: 6px 0; font-weight: bold;">Phone/WhatsApp:</td>
            <td style="padding: 6px 0;">${safePhone}</td>
          </tr>`
              : ""
          }
          ${
            product
              ? `
          <tr>
            <td style="padding: 6px 0; font-weight: bold;">Product Interest:</td>
            <td style="padding: 6px 0; color: #f97316; font-weight: bold;">${safeProduct}</td>
          </tr>`
              : ""
          }
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
          <h4 style="margin: 0 0 8px 0; color: #1e3a5f;">Customer Message:</h4>
          <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
        </div>
        
        <p style="font-size: 11px; color: #64748b; margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 10px; text-align: center;">
          This inquiry was sent automatically from the Prophetchef website contact form.
        </p>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject,
        html: htmlBody,
      }),
    });

    const resendData = await resendResponse.json().catch(() => null);

    if (!resendResponse.ok) {
      console.error(
        "Resend API Error details:",
        resendData || { status: resendResponse.status },
      );
      const resendMessage =
        typeof resendData === "object" && resendData && "message" in resendData
          ? String(resendData.message)
          : "Failed to send email through Resend API.";
      throw new Error(resendMessage);
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: "Inquiry received successfully. Our team will contact you soon.",
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Inquiry API error:", errorMessage);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process inquiry. Please try again later.",
      },
      { status: 500 },
    );
  }
}
