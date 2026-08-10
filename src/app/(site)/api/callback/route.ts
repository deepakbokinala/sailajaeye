import { Resend } from "resend";

const TO_EMAIL = "vineeljudson@gmail.com";
// Resend's shared sender works without domain verification. Once a domain is
// verified in Resend, set CALLBACK_FROM_EMAIL to an address on that domain.
const FROM_EMAIL =
  process.env.CALLBACK_FROM_EMAIL ?? "Callback Request <onboarding@resend.dev>";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Email is not configured." },
      { status: 500 },
    );
  }

  let body: { name?: unknown; phone?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  if (!name || !phone) {
    return Response.json(
      { error: "Name and phone are required." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: `New callback request from ${name}`,
    text: `A new callback request was submitted on the website.\n\nName: ${name}\nPhone: ${phone}`,
    html: `<h2>New Callback Request</h2><p>A new callback request was submitted on the website.</p><table cellpadding="6" style="border-collapse:collapse"><tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr><tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr></table>`,
  });

  if (error) {
    return Response.json({ error: "Failed to send email." }, { status: 502 });
  }

  return Response.json({ ok: true });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
