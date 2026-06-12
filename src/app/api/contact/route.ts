import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message } = await request.json();

    // Basic validation
    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Contact form error: RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Process Supreme <noreply@processsupreme.com>",
      to: "john@thrivenevada.com",
      replyTo: email,
      subject: `New inquiry from ${name} at ${company}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #722F37; border-bottom: 2px solid #722F37; padding-bottom: 12px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #333; width: 100px;">Name</td>
              <td style="padding: 8px 0; color: #555;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #333;">Email</td>
              <td style="padding: 8px 0; color: #555;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #333;">Company</td>
              <td style="padding: 8px 0; color: #555;">${company}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f8f7f6; border-radius: 8px;">
            <p style="font-weight: 600; color: #333; margin: 0 0 8px 0;">Message</p>
            <p style="color: #555; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
