"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SmartHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide if scrolling down past 100px, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`site-header ${isVisible ? '' : 'header-hidden'}`}>
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            <img src="/logo.png" alt="Wear&Go" className="logo-img" />
          </Link>
          <nav className="nav">
            <ul className="nav-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Shop Collection</Link></li>
              <li><Link href="/about">Our Story</Link></li>
            </ul>
          </nav>
          <div className="nav-actions">
            <button aria-label="Cart" className="cart-btn">Bag (0)</button>
            <button aria-label="Menu" className="mobile-menu-btn">Menu</button>
          </div>
        </div>
      </div>
    </header>
  );
}
