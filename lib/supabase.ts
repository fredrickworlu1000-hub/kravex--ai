import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error(
    "Supabase environment variables are missing. Check your .env.local file."
  );
}

export const supabase = createClient(
  supabaseUrl ?? "",
  supabaseServiceRoleKey ?? ""
);