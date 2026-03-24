import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const message =
    body && typeof body === "object" && "message" in body
      ? (body as Record<string, unknown>).message
      : undefined;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Message is too long (max 5000 characters)." },
      { status: 400 }
    );
  }

  const trimmed = message.trim();

  // Google Form submission details
  const formUrl =
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeCarjjO8I2MxzflwBNuCxSD5OZz_k_zIPM1HaApbvvEfGamg/formResponse";
  const entryId = "849768593"; // Entry ID for "What's on your mind?" field

  try {
    const formData = new URLSearchParams();
    formData.append(`entry.${entryId}`, trimmed);

    const response = await fetch(formUrl, {
      method: "POST",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Google Forms returns 200 on successful submission
    if (!response.ok && response.status !== 200) {
      throw new Error(`Form submission returned ${response.status}`);
    }
  } catch (err) {
    console.error("[Open Line] Google Form submission error:", err);
    return NextResponse.json(
      { error: "Failed to save your submission. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
