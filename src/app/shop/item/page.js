"use client";

import { useEffect, useState } from 'react';
import styles from './item.module.css';

export default function ProductItem() {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky footer after scrolling down a bit (e.g., past main images)
      if (window.scrollY > 300) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Classic 1g Pendant - Wear & Go',
          text: 'Check out this beautiful 1-gram gold piece!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleAddToBag = () => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50); // Haptic feedback
    }
    console.log('Added to bag from PDP');
  };

  return (
    <div className={styles.productPage}>
      <div className={styles.container}>
        <div className={styles.productGrid}>
          {/* Left Column: Images */}
          <div className={styles.imageGallery}>
            <div className={styles.mainImage} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?auto=format&fit=crop&w=1200&q=80')" }}></div>
            <div className={styles.subImages}>
              <div className={styles.subImage} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80')" }}></div>
              <div className={styles.subImage} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=80')" }}></div>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className={styles.productInfo}>
            <div className={styles.breadcrumb}>
              <a href="/">Home</a> / <a href="/shop">Shop</a> / Classic 1g Pendant
            </div>
            <div className={styles.titleArea}>
              <h1 className={styles.title}>Classic 1g Pendant</h1>
              <button onClick={handleShare} className={styles.shareBtn} aria-label="Share">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
              </button>
            </div>
            <p className={styles.price}>$85.00</p>

            <div className={styles.description}>
              <p>An everyday essential. This minimalist 1-gram gold pendant is designed to catch the light beautifully while remaining completely weightless on the collarbone.</p>
              <ul>
                <li>100% certified 1-gram gold</li>
                <li>Waterproof & tarnish resistant</li>
                <li>Includes an adjustable 16-18" chain</li>
              </ul>
            </div>

            <button className={`btn-primary ${styles.addToBagBtn}`} onClick={handleAddToBag}>
              Add to Bag - $85.00
            </button>
            
            <div className={styles.shippingInfo}>
              <p>Free standard shipping on all orders.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Footer (Appears on scroll) */}
      <div className={`${styles.stickyFooter} ${isScrolledPastHero ? styles.stickyVisible : ''}`}>
        <div className={styles.stickyContent}>
          <div className={styles.stickyInfo}>
            <h4>Classic 1g Pendant</h4>
            <p>$85.00</p>
          </div>
          <button className={`btn-primary ${styles.stickyBtn}`} onClick={handleAddToBag}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
