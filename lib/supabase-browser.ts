import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let client: SupabaseClient | null = null

export function isSupabaseConfigured() {
  return Boolean(url && anonKey)
}

export function getSupabaseClient() {
  if (!url || !anonKey) {
    throw new Error("Supabase env vars are not configured.")
  }

  if (!client) {
    client = createClient(url, anonKey)
  }

  return client
}
