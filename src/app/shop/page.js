"use client";

import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../lib/shopify';
import styles from './shop.module.css';

export default function Shop() {
  const [products, setProducts] = useState([
    { id: 1, title: 'Pink Stone Stud Earring', handle: 'pink-stone-stud-earring', price: '₹699.00', rawPrice: 699, image: 'https://cdn.shopify.com/s/files/1/0834/6818/9954/files/2.jpg?v=1787744806', hoverImage: 'https://cdn.shopify.com/s/files/1/0834/6818/9954/files/1.jpg?v=1787744214', variantId: 'gid://shopify/ProductVariant/48387646324994' },
    { id: 2, title: 'Green Stone Stud Earring', handle: 'green-stone-stud-earring', price: '₹699.00', rawPrice: 699, image: 'https://cdn.shopify.com/s/files/1/0834/6818/9954/files/Green_1.jpg?v=1788282689', hoverImage: 'https://cdn.shopify.com/s/files/1/0834/6818/9954/files/Green_2.jpg?v=1788282790', variantId: 'gid://shopify/ProductVariant/48424026964226' },
  ]);

  // Fetch live products on mount
  useEffect(() => {
    async function fetchLiveProducts() {
      try {
        const res = await fetch('/api/products');
        const live = await res.json();
        if (live && live.length > 0) {
          setProducts(live);
        }
      } catch (e) {
        console.error("Error fetching live products:", e);
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
              id={product.id}
              index={index}
              title={product.title}
              price={product.price}
              rawPrice={product.rawPrice}
              image={product.image}
              hoverImage={product.hoverImage}
              handle={product.handle}
              variantId={product.variantId}
            />
          ))}
        </div>
        
      </main>
    </div>
  );
}
