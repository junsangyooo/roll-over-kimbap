// /lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 브라우저에서만 재사용할 인스턴스
let browserClient: SupabaseClient | null = null

// 브라우저에서만 호출해라
export function getSupabaseBrowserClient(): SupabaseClient {
  if (typeof window === 'undefined') {
    // 서버/빌드에서는 여기 들어오면 안 된다
    throw new Error('getSupabaseBrowserClient must be called in the browser')
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    // 브라우저인데도 env가 없다 → Vercel에 env 안 넣은 상황
    throw new Error(
      'Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    )
  }

  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey)
  }

  return browserClient
}
