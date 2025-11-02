'use client'

import { useEffect, useState } from 'react'

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // 아래로 스크롤할 때 navbar 숨기기
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHidden(true)
      } else {
        // 위로 스크롤할 때 navbar 보이기
        setIsHidden(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header className={`navbar ${isHidden ? 'hide' : ''}`}>
      <nav className="nav-container">
        {/* Left Side - Logo & Navigation Links */}
        <div className="nav-left">
          <a href="/" className="nav-logo">
            <img src="/images/logo-items/Logo_rectangle_main_green.png" alt="Roll Over Kimbap" />
          </a>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Right Side - Auth & Cart & Order */}
        <div className="nav-right">
          <a href="/#" className="nav-link-button" onClick={(e) => {
            e.preventDefault()
            // Modal login will be handled here
            const event = new CustomEvent('openLoginModal')
            window.dispatchEvent(event)
          }}>Log In</a>
          <a href="/cart" className="nav-link-button cart-button">
            <span>Cart</span>
            <span className="cart-count">0</span>
          </a>
          <a href="/order-online" className="nav-link-button order-button">Order Online</a>
        </div>
      </nav>
    </header>
  )
}
