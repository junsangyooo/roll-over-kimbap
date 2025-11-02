// /lib/auth-context.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getSupabaseBrowserClient } from './supabase'

type AuthContextType = {
  user: any
  loading: boolean
  signUp: (
    email: string,
    password: string,
    metadata?: Record<string, any>
  ) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 브라우저에서만 실행
    const init = async () => {
      try {
        const supabase = getSupabaseBrowserClient()

        const { data } = await supabase.auth.getSession()
        setUser(data.session?.user ?? null)

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null)
        })

        // cleanup
        return () => {
          subscription.unsubscribe()
        }
      } catch (err) {
        console.error('Auth init failed:', err)
        // env 없을 때도 UI는 뜨게
        setUser(null)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    // 실행
    init()
  }, [])

  const signUp = async (
    email: string,
    password: string,
    metadata: Record<string, any> = {}
  ) => {
    const supabase = getSupabaseBrowserClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo:
          typeof window !== 'undefined'
            ? `${window.location.origin}/auth/login`
            : undefined,
      },
    })

    if (error) {
      throw new Error(error.message)
    }
  }

  const signIn = async (email: string, password: string) => {
    const supabase = getSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      throw new Error(error.message)
    }
  }

  const signOut = async () => {
    const supabase = getSupabaseBrowserClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
  }

  const signInWithGoogle = async () => {
    const supabase = getSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo:
          typeof window !== 'undefined'
            ? `${window.location.origin}/auth/callback`
            : undefined,
      },
    })
    if (error) {
      throw new Error(error.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, signIn, signOut, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
