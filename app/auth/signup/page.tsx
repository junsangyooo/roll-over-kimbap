'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

export default function SignUp() {
  const router = useRouter()
  const { signUp, signInWithGoogle } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // 유효성 검사
      if (!email || !password || !confirmPassword) {
        throw new Error('모든 필드를 입력해주세요.')
      }

      if (password.length < 6) {
        throw new Error('비밀번호는 최소 6자 이상이어야 합니다.')
      }

      if (password !== confirmPassword) {
        throw new Error('비밀번호가 일치하지 않습니다.')
      }

      await signUp(email, password)
      setSuccess(true)

      // 3초 후 로그인 페이지로 이동
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '회원가입 실패'
      setError(errorMessage)
      console.error('SignUp error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setLoading(true)
    setError('')

    try {
      await signInWithGoogle()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google 로그인 실패'
      setError(errorMessage)
      console.error('Google signup error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>회원가입</h1>
        <p>Roll Over에 가입하세요</p>

        {error && <div className="error-message">{error}</div>}

        {success && (
          <div className="success-message">
            ✅ 회원가입이 완료되었습니다! 확인 이메일을 확인하고 로그인해주세요.
          </div>
        )}

        {/* 이메일 회원가입 */}
        <form onSubmit={handleEmailSignUp} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        {/* 구분선 */}
        <div className="divider">또는</div>

        {/* Google 로그인 */}
        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="google-button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google로 가입
        </button>

        {/* 로그인 링크 */}
        <p className="auth-footer">
          이미 계정이 있으신가요?{' '}
          <Link href="/auth/login">로그인</Link>
        </p>
      </div>
    </div>
  )
}
