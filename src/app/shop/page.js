"use client";

import { useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import styles from './shop.module.css';

const MOCK_PRODUCTS = [
  { id: 1, title: 'Radiant 1g Gold Earrings', price: '$85.00', image: '/product-gold-1.jpg', hoverImage: '/product-gold-2.jpg' },
  { id: 2, title: 'Minimalist Gold Ring', price: '$95.00', image: 'https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&w=600&q=80', hoverImage: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: 'Elegant Drop Earrings', price: '$110.00', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80', hoverImage: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=600&q=80' },
  { id: 4, title: 'Gold Link Bracelet', price: '$130.00', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80', hoverImage: 'https://images.unsplash.com/photo-1574539602047-548bf9557352?auto=format&fit=crop&w=600&q=80' },
  { id: 5, title: 'Textured Gold Hoops', price: '$80.00', image: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=600&q=80', hoverImage: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=600&q=80' },
  { id: 6, title: 'Gold Coin Pendant', price: '$80.00', image: 'https://images.unsplash.com/photo-1610996500854-1502f1a66802?auto=format&fit=crop&w=600&q=80', hoverImage: 'https://images.unsplash.com/photo-1571556961556-9d6287db00d6?auto=format&fit=crop&w=600&q=80' },
  { id: 7, title: 'Delicate Pearl Chain', price: '$115.00', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=80', hoverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80' },
  { id: 8, title: 'Layered Gold Necklace', price: '$145.00', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80', hoverImage: 'https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?auto=format&fit=crop&w=600&q=80' },
];

export default function Shop() {
  
  // Apply scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className={styles.shopPage}>
      <main className="container">
        
        <div className={`${styles.shopHeader} reveal`}>
          <h1>The Collection</h1>
          <p className="reveal reveal-delay-1">Explore our exclusive 1-gram gold jewelry pieces.</p>
        </div>

        <div className={`${styles.filterBar} reveal reveal-delay-2`}>
          <div className={styles.filterText}>
            <span>Filter</span> 
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.filterOptions}>
            <span className={styles.filterText}>8 Items</span>
            <div className={styles.filterText}>
              <span>Sort By: Featured</span>
            </div>
          </div>
        </div>

        <div className={styles.productGrid}>
          {MOCK_PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              index={index}
              title={product.title}
              price={product.price}
              image={product.image}
              hoverImage={product.hoverImage}
            />
          ))}
        </div>
        
      </main>
    </div>
  );
}
