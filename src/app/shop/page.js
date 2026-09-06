"use client";

import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../lib/shopify';
import styles from './shop.module.css';

export default function Shop() {
  const [products, setProducts] = useState([
    { id: 1, title: 'Radiant 1g Gold Earrings', price: '$85.00', image: '/product-gold-1.jpg', hoverImage: '/product-gold-2.jpg' },
    { id: 2, title: 'Minimalist Gold Ring', price: '$95.00', image: 'https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&w=600&q=80', hoverImage: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=600&q=80' },
  ]);

  // Fetch live products on mount
  useEffect(() => {
    async function fetchLiveProducts() {
      const live = await getProducts();
      if (live && live.length > 0) {
        setProducts(live);
      }
    }
    fetchLiveProducts();
  }, []);

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
  }, [products]); // Re-run when products update

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
          {products.map((product, index) => (
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
