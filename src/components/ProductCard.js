"use client";

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ id, title, price, rawPrice, image, hoverImage, index, handle, variantId }) {
  const { addToCart } = useCart();

  const primaryImg = image || '/product-gold-1.jpg';
  const secondaryImg = hoverImage || primaryImg;
  
  const delayClass = index % 4 === 1 ? 'reveal-delay-1' : index % 4 === 2 ? 'reveal-delay-2' : index % 4 === 3 ? 'reveal-delay-3' : '';
  const productHref = handle ? `/shop/${handle}` : '/shop';

  const handleAddToBag = (e) => {
    e.preventDefault();
    if (variantId) {
      addToCart({
        id,
        title,
        handle,
        price,
        rawPrice: rawPrice || parseFloat(String(price).replace(/[^0-9.]/g, '')) || 0,
        image: primaryImg,
        variantId
      }, 1);
    }
  };

  return (
    <div className={`${styles.featuredCard} reveal ${delayClass}`}>
      <div className={styles.cardImageWrapper}>
        <Link href={productHref} className={`${styles.cardImage} ${styles.primaryImage}`} style={{ backgroundImage: `url('${primaryImg}')` }} aria-label={title}></Link>
        <Link href={productHref} className={`${styles.cardImage} ${styles.secondaryImage}`} style={{ backgroundImage: `url('${secondaryImg}')` }} aria-label={title}></Link>
        <div className={styles.quickAddWrapper}>
          <button className={styles.quickAddBtn} onClick={handleAddToBag}>Add to Bag</button>
        </div>
      </div>
      <div className={styles.cardInfo}>
        <h3><Link href={productHref}>{title}</Link></h3>
        <p>{price}</p>
      </div>
    </div>
  );
}
