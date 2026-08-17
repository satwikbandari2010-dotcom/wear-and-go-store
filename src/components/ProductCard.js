"use client";

import Link from 'next/link';
import styles from './ProductCard.module.css';

export default function ProductCard({ title, price, image, hoverImage, index }) {
  // Use the provided image, or fallback to a generic jewelry photo
  const primaryImg = image || 'https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?auto=format&fit=crop&w=600&q=80';
  const secondaryImg = hoverImage || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80';
  
  // Calculate a staggered delay based on index for the scroll reveal
  const delayClass = index % 4 === 1 ? 'reveal-delay-1' : index % 4 === 2 ? 'reveal-delay-2' : index % 4 === 3 ? 'reveal-delay-3' : '';

  const handleAddToBag = (e) => {
    e.preventDefault(); // Prevent default link behavior if inside one
    // Trigger haptic feedback on supported mobile devices
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50); // Light haptic tap
    }
    // Additional add to cart logic would go here
    console.log(`Added ${title} to bag`);
  };

  return (
    <div className={`${styles.featuredCard} reveal ${delayClass}`}>
      <div className={styles.cardImageWrapper}>
        <Link href="/shop/item" className={`${styles.cardImage} ${styles.primaryImage}`} style={{ backgroundImage: `url('${primaryImg}')` }} aria-label={title}></Link>
        <Link href="/shop/item" className={`${styles.cardImage} ${styles.secondaryImage}`} style={{ backgroundImage: `url('${secondaryImg}')` }} aria-label={title}></Link>
        <div className={styles.quickAddWrapper}>
          <button className={styles.quickAddBtn} onClick={handleAddToBag}>Add to Bag</button>
        </div>
      </div>
      <div className={styles.cardInfo}>
        <h3><Link href="/shop/item">{title}</Link></h3>
        <p>{price}</p>
      </div>
    </div>
  );
}
