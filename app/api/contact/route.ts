import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactFormSchema } from "@/app/components/contact/contact-schema";

const resendApiKey = process.env.RESEND_API_KEY;
const contactRecipient = process.env.CONTACT_EMAIL_TO;
const contactSender =
  process.env.CONTACT_EMAIL_FROM ?? "Sotico Contact <onboarding@resend.dev>";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (!resendApiKey || !contactRecipient) {
      return NextResponse.json(
        {
          error:
            "Missing email configuration. Set RESEND_API_KEY and CONTACT_EMAIL_TO.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const data = parsed.data;

    await resend.emails.send({
      from: contactSender,
      to: [contactRecipient],
      replyTo: data.email,
      subject: `Sotico contact form: ${data.enquiryType}`,
      text: [
        `Locale: ${data.locale}`,
        `Name: ${data.firstName} ${data.lastName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "-"}`,
        `Company: ${data.company}`,
        `Job Title: ${data.jobTitle || "-"}`,
        `Enquiry Type: ${data.enquiryType}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 16px;">New Sotico contact form submission</h2>
          <p><strong>Locale:</strong> ${escapeHtml(data.locale)}</p>
          <p><strong>Name:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone || "-")}</p>
          <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
          <p><strong>Job Title:</strong> ${escapeHtml(data.jobTitle || "-")}</p>
          <p><strong>Enquiry Type:</strong> ${escapeHtml(data.enquiryType)}</p>
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form email error:", error);

    return NextResponse.json(
      { error: "Unable to send message right now." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
