'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  zipCode: string
  emailSubscribe: boolean
  smsSubscribe: boolean
  termsAgreed: boolean
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, profile: UserProfile) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // 초기 세션 확인
  useEffect(() => {
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    // 인증 상태 변경 감시
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription?.unsubscribe()
  }, [])

  // 회원가입 (이메일 + 사용자 정보 저장)
  const signUp = async (email: string, password: string, profile: UserProfile) => {
    try {
      // 1. Supabase Auth에 사용자 등록
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('Failed to create user')

      // 2. user_profiles 테이블에 사용자 정보 저장
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          first_name: profile.firstName,
          last_name: profile.lastName,
          email: profile.email,
          phone_number: profile.phoneNumber || null,
          zip_code: profile.zipCode,
          email_subscribe: profile.emailSubscribe,
          sms_subscribe: profile.smsSubscribe,
          terms_agreement: profile.termsAgreed,
          created_at: new Date().toISOString(),
        })

      if (profileError) {
        // 프로필 저장 실패 시 Auth 사용자도 삭제
        await supabase.auth.admin.deleteUser(authData.user.id)
        throw new Error(`Failed to save user profile: ${profileError.message}`)
      }
    } catch (error) {
      throw error
    }
  }

  // 로그인 (이메일)
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
    } catch (error) {
      throw error
    }
  }

  // Google 로그인
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error) {
      throw error
    }
  }

  // 로그아웃
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
