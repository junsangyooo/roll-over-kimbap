// lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase: SupabaseClient | null = null

if (url && key) {
  supabase = createClient(url, key)
} else {
  if (typeof window === 'undefined') {
    console.warn('Supabase env vars missing')
  }
}

export { supabase }
