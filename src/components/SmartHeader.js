"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function SmartHeader() {
  const { totalCount, setIsCartOpen } = useCart();
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
              <li><Link href="/track">Track Order</Link></li>
              <li><Link href="/about">Our Story</Link></li>
            </ul>
          </nav>
          <div className="nav-actions">
            <Link href="/track" className="cart-btn" style={{ marginRight: '0.5rem' }}>
              Track Order
            </Link>
            <button aria-label="Cart" className="cart-btn" onClick={() => setIsCartOpen(true)}>
              Bag ({totalCount})
            </button>
            <button aria-label="Menu" className="mobile-menu-btn">Menu</button>
          </div>
        </div>
      </div>
    </header>
  );
}
