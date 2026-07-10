import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const correctPassword = process.env.DASHBOARD_PASSWORD;

  if (!session || !correctPassword || session !== correctPassword) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json({ error: "Failed to load leads." }, { status: 500 });
  }

  return NextResponse.json({ leads: data });
}