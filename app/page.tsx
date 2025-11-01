'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url?: string
}

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .limit(3)

        if (error) throw error
        setFeaturedItems(data || [])
      } catch (err) {
        console.error('Failed to fetch menu items:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedItems()
  }, [])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: 'url(/images/group-items/group_images_4.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-subtitle">Eat Real Kimbap. Inside Matters.</p>
          <Link href="/menu" className="btn btn-primary hero-btn">
            Menu
          </Link>
        </div>
      </section>
        
      {/* Introduction Section */}
      <section className="introduction-section">
        <div className="section-container">
          <div className="introduction-content">
            <p className="body_large">
              Roll Over Kimbap began to serve busy, modern eaters who will not give up great taste or health.
              <br />
              <br />
              Kimbap is Korean comfort food. Each ingredient is prepared with care, and in one bite they come together in a harmony you never forget. It is portable, just the right size, and beautiful to look at.
            </p>
          </div>
        </div>
      </section>
      {/* Service Section */}
      <section className="service-section">
        <div className="section-container">
          <h2 className="section-title">Our Services</h2>
          <div className="service-content">
            <div className="service-text">
              <p>
                Roll Over Kimbap brings authentic Korean cuisine to Brooklyn.
                Each kimbap roll is carefully crafted with fresh vegetables,
                seasoned rice, and premium proteins.
              </p>
              <p>
                Our commitment to quality ingredients and traditional preparation
                methods ensures every bite is delicious and satisfying.
              </p>
            </div>
            <div className="about-info">
              <div className="info-item">
                <h3>Address</h3>
                <p>394 McGuinness Boulevard, Brooklyn, NY 11222</p>
              </div>
              <div className="info-item">
                <h3>Hours</h3>
                <p>Monday - Friday: 11am - 9pm</p>
                <p>Saturday - Sunday: 10am - 10pm</p>
              </div>
              <div className="info-item">
                <h3>Contact</h3>
                <p>Phone: (631) 590-9330</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to taste authentic kimbap?</h2>
          <p>Order online or visit us at our Brooklyn location</p>
          <div className="cta-buttons">
            <Link href="/order-online" className="btn btn-primary">
              Order Online
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
