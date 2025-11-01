'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Name, Email, Message are required.')
      }

      // Save data to Supabase
      const { data, error: dbError } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            message: formData.message,
          },
        ])
        .select()

      if (dbError) {
        throw new Error(dbError.message)
      }

      // Success
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      })

      // 3초 후 성공 메시지 사라짐
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred.'
      setError(errorMessage)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Please contact us. We will respond quickly!</p>

      {success && (
        <div className="success-message">
          ✅ Your message has been sent! We will get back to you shortly.
        </div>
      )}

      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">이름 *</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="이름을 입력해주세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일 *</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">전화번호</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(631) 590-9330"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">메시지 *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="메시지를 입력해주세요"
            rows={5}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? '전송 중...' : '메시지 전송'}
        </button>
      </form>
    </div>
  )
}
