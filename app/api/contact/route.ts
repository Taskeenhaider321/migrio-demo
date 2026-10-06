import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Handles the contact form as a classic HTML POST so the form works with
 * JavaScript disabled. Replace the `deliver` step with your email provider,
 * CRM or ticketing webhook.
 */
export async function POST(request: NextRequest) {
  const form = await request.formData();

  const honeypot = String(form.get("company_website") ?? "");
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const topic = String(form.get("topic") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  const consent = form.get("consent") === "on";

  const looksValid =
    honeypot === "" &&
    name.length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) &&
    message.length >= 10 &&
    consent;

  if (!looksValid) {
    // Hash fragment, not a query string, so /contact stays static.
    return NextResponse.redirect(
      new URL("/contact#form-error", request.url),
      303,
    );
  }

  await deliver({ name, email, topic, message });

  return NextResponse.redirect(new URL("/contact/thanks", request.url), 303);
}

async function deliver(submission: {
  name: string;
  email: string;
  topic: string;
  message: string;
}) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    console.info("[contact] no CONTACT_WEBHOOK_URL set", {
      topic: submission.topic,
      email: submission.email,
    });
    return;
  }

  await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(submission),
  });
}
