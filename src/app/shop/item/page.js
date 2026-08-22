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
            <div className={styles.mainImage} style={{ backgroundImage: "url('/product-gold-1.jpg')" }}></div>
            <div className={styles.subImages}>
              <div className={styles.subImage} style={{ backgroundImage: "url('/product-gold-2.jpg')" }}></div>
              <div className={styles.subImage} style={{ backgroundImage: "url('/product-gold-1.jpg')" }}></div>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className={styles.productInfo}>
            <div className={styles.breadcrumb}>
              <a href="/">Home</a> / <a href="/shop">Shop</a> / Radiant 1g Gold Earrings
            </div>
            <div className={styles.titleArea}>
              <h1 className={styles.title}>Radiant 1g Gold Earrings</h1>
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
              <h3 className={styles.descHeading}>The 1-Gram Gold Revolution</h3>
              <p>Why choose between exorbitantly expensive solid gold and cheap, fading imitation jewelry?</p>
              <p>Crafted with a pure 1-gram gold micro-plating over a hypoallergenic core, this piece gives you the exact radiant look, heavy feel, and timeless elegance of 24k solid gold. Whether you're elevating your daily office wear or completing a stunning wedding outfit, you deserve that flawless, golden-hour glow every single day.</p>
              <p><strong>Look like a million bucks. Wear it without worry.</strong></p>
            </div>

            <button className={`btn-primary ${styles.addToBagBtn}`} onClick={handleAddToBag}>
              Add to Bag - $85.00
            </button>
            
            {/* Trust Grid */}
            <div className={styles.trustGrid}>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>🔄</span>
                <span className={styles.trustText}>7-Day Easy Replacements</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>💰</span>
                <span className={styles.trustText}>100% Refund Guarantee</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>✨</span>
                <span className={styles.trustText}>Waterproof & Anti-Tarnish</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>🛡️</span>
                <span className={styles.trustText}>Skin-Friendly (Hypoallergenic)</span>
              </div>
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
