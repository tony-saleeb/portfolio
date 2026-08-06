import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Here you would integrate with Resend, SendGrid, or any other email provider.
    // For now, we will just simulate a successful submission.
    console.log(`New contact form submission from ${name} (${email}): ${message}`);

    // Wait for 1 second to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
