import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();

  const correctPassword = process.env.DASHBOARD_PASSWORD;

  if (!correctPassword) {
    console.error("DASHBOARD_PASSWORD is not set.");
    return NextResponse.json(
      { error: "Dashboard isn't configured yet." },
      { status: 500 }
    );
  }

  if (password !== correctPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin_session", correctPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  return response;
}