import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validation/contact";
import { supabase } from "@/lib/supabase";
import { analyzeLead } from "@/lib/gemini";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check the form and try again." },
        { status: 400 }
      );
    }

    if (result.data.company_website) {
      return NextResponse.json({ success: true });
    }

    const { name, email, company, message } = result.data;
    const analysis = await analyzeLead(name, message);

    const { error: dbError } = await supabase.from("leads").insert({
      name,
      email,
      company: company || null,
      message,
      category: analysis.category,
      urgency: analysis.urgency,
      summary: analysis.summary,
      ai_draft: analysis.draft,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? "hello@kravex.ai";
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

    if (!apiKey) {
      console.error("RESEND_API_KEY is not set.");
      return NextResponse.json(
        { error: "Email service isn't configured yet." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `Kravex AI Website <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `[${analysis.urgency.toUpperCase()}] New ${analysis.category} inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        "",
        `AI Summary: ${analysis.summary}`,
        `Category: ${analysis.category}`,
        `Urgency: ${analysis.urgency}`,
        "",
        "Original message:",
        message,
        "",
        "Suggested reply draft:",
        analysis.draft,
      ].filter(Boolean).join("\n"),
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}