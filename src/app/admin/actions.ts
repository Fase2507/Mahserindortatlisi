"use server"

import { createClient } from "@supabase/supabase-js"

export async function fetchApplications(sortDir: "asc" | "desc") {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) throw new Error("Supabase env eksik")

  const client = createClient(url, key)

  const { data, error } = await client
    .from("applications")
    .select("*")
    .order("created_at", { ascending: sortDir === "asc" })

  if (error) throw new Error(`Supabase: ${error.message} (code: ${error.code})`)
  return data ?? []
}