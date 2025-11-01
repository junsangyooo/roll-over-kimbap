'use client'

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

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('category', { ascending: true })

        if (error) throw error

        setMenuItems(data || [])

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set((data || []).map((item) => item.category))
        ) as string[]
        setCategories(uniqueCategories)
        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0])
        }
      } catch (err) {
        console.error('Failed to fetch menu items:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory
  )

  return (
    <div className="menu-page">
      {/* Page Header */}
      <section className="menu-header">
        <h1>Our Menu</h1>
        <p>Authentic Korean Kimbap and Side Dishes</p>
      </section>

      {/* Menu Content */}
      <section className="menu-content">
        <div className="section-container">
          {loading ? (
            <div className="loading">Loading menu...</div>
          ) : categories.length > 0 ? (
            <>
              {/* Category Filter */}
              <div className="category-filter">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`category-btn ${
                      selectedCategory === category ? 'active' : ''
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Menu Items Grid */}
              {filteredItems.length > 0 ? (
                <div className="menu-grid">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="menu-card">
                      {item.image_url && (
                        <div className="menu-card-image">
                          <img src={item.image_url} alt={item.name} />
                        </div>
                      )}
                      <div className="menu-card-content">
                        <div className="menu-card-header">
                          <h3 className="menu-card-title">{item.name}</h3>
                          <p className="menu-card-price">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="menu-card-description">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-items">
                  No items in this category.
                </div>
              )}
            </>
          ) : (
            <div className="no-items">No menu items available.</div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="menu-info">
        <div className="section-container">
          <h2>Ready to Order?</h2>
          <p>Visit us or order online for pickup or delivery</p>
          <div className="info-buttons">
            <a href="/order-online" className="btn btn-primary">
              Order Online
            </a>
            <a href="/contact" className="btn btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
