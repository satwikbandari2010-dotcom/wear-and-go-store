"use client";

import { useCallback, useRef, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './page.module.css';

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps'
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Scroll Reveal Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optional: stop observing once revealed so it doesn't animate out and in repeatedly
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const products = [
    { id: 1, title: 'Classic 1g Pendant', price: '$85.00', image: 'https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?auto=format&fit=crop&w=600&q=80', hoverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Minimalist Gold Ring', price: '$95.00', image: 'https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&w=600&q=80', hoverImage: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'Elegant Drop Earrings', price: '$110.00', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80', hoverImage: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=600&q=80' },
    { id: 4, title: 'Gold Link Bracelet', price: '$130.00', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80', hoverImage: 'https://images.unsplash.com/photo-1574539602047-548bf9557352?auto=format&fit=crop&w=600&q=80' },
    { id: 5, title: 'Textured Gold Hoops', price: '$80.00', image: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=600&q=80', hoverImage: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroText}>
            <h1 className="reveal">Pure Gold. <br/> Infinite Elegance.</h1>
            <p className="reveal reveal-delay-1">Discover our meticulously crafted 1-gram gold collection. Designed for the modern aesthetic, rooted in timeless tradition.</p>
            <div className={`${styles.heroButtons} reveal reveal-delay-2`}>
              <a href="/shop" className="btn-primary">Explore Collection</a>
              <a href="/about" className="btn-secondary">The Craftsmanship</a>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Lookbook Section */}
      <section className={styles.editorial}>
        <div className="container">
          <div className={styles.splitLayout}>
            <div className={`${styles.splitImage} reveal`} style={{ backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80')` }}></div>
            <div className={`${styles.splitText} reveal reveal-delay-1`}>
              <h2>The Heritage Collection</h2>
              <p>A curated selection of our finest 1-gram gold pieces, designed to be passed down through generations. Our master craftsmen spend hours perfecting the delicate curves and brilliant shine of each piece.</p>
              <a href="/shop" className="btn-secondary" style={{ marginTop: '2rem', display: 'inline-block' }}>Discover the Collection</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
