import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, message, product } = body;

    // 1. Basic Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ success: false, message: "Name is required." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ success: false, message: "A valid email is required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.RESEND_TO_EMAIL;

    // 2. Local / Development Sandbox Mode check
    const isSandbox = !apiKey || apiKey === "" || apiKey.startsWith("re_placeholder");

    if (isSandbox) {
      if (process.env.NODE_ENV !== "production") {
        console.log("[Resend Sandbox Mode] Received Inquiry (PII logged in development only):", {
          name,
          email,
          company,
          phone,
          product,
          message,
        });
      } else {
        console.log("[Resend Sandbox Mode] Received Inquiry. Successfully validated payload. (PII logging omitted in production)");
      }

      return NextResponse.json({
        success: true,
        message: "Inquiry received successfully (Sandbox Mode). Our team will contact you soon.",
      });
    }

    // 3. Verify Recipient Email Configuration
    if (!toEmail) {
      console.error("Inquiry API Error: RESEND_TO_EMAIL is not configured.");
      return NextResponse.json({
        success: false,
        message: "Inquiry system configuration error. Please contact us directly.",
      }, { status: 500 });
    }

    // 4. Send Email via Resend API
    const subject = product 
      ? `New Website Product Inquiry: ${product} from ${name}`
      : `New Website Contact Inquiry from ${name}`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
        <h2 style="color: #1e3a5f; border-bottom: 2px solid #f97316; padding-bottom: 8px; margin-top: 0;">New Website Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; width: 120px;">Name:</td>
            <td style="padding: 6px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold;">Email:</td>
            <td style="padding: 6px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          ${company ? `
          <tr>
            <td style="padding: 6px 0; font-weight: bold;">Company:</td>
            <td style="padding: 6px 0;">${company}</td>
          </tr>` : ""}
          ${phone ? `
          <tr>
            <td style="padding: 6px 0; font-weight: bold;">Phone/WhatsApp:</td>
            <td style="padding: 6px 0;">${phone}</td>
          </tr>` : ""}
          ${product ? `
          <tr>
            <td style="padding: 6px 0; font-weight: bold;">Product Interest:</td>
            <td style="padding: 6px 0; color: #f97316; font-weight: bold;">${product}</td>
          </tr>` : ""}
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
          <h4 style="margin: 0 0 8px 0; color: #1e3a5f;">Customer Message:</h4>
          <p style="margin: 0; white-space: pre-wrap;">${message || "No message provided."}</p>
        </div>
        
        <p style="font-size: 11px; color: #64748b; margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 10px; text-align: center;">
          This inquiry was sent automatically from the Prophetchef website contact form.
        </p>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject,
        html: htmlBody,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API Error details:", resendData);
      throw new Error(resendData.message || "Failed to send email through Resend API.");
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: "Inquiry received successfully. Our team will contact you soon.",
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Inquiry API error:", errorMessage);
    return NextResponse.json({
      success: false,
      message: "Failed to process inquiry. Please try again later.",
    }, { status: 500 });
  }
}
