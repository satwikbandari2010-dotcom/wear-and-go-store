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
    { id: 1, title: 'Radiant 1g Gold Earrings', price: '$85.00', image: '/product-gold-1.jpg', hoverImage: '/product-gold-2.jpg' },
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

      <section className={`${styles.marqueeSection} reveal`}>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            <span className={styles.marqueeItem}>PURE 1-GRAM GOLD</span>
            <span className={styles.marqueeDot}>·</span>
            <span className={styles.marqueeItem}>EXQUISITE CRAFTSMANSHIP</span>
            <span className={styles.marqueeDot}>·</span>
            <span className={styles.marqueeItem}>TIMELESS ELEGANCE</span>
            <span className={styles.marqueeDot}>·</span>
            <span className={styles.marqueeItem}>FREE WORLDWIDE SHIPPING</span>
            <span className={styles.marqueeDot}>·</span>
            <span className={styles.marqueeItem}>PURE 1-GRAM GOLD</span>
            <span className={styles.marqueeDot}>·</span>
            <span className={styles.marqueeItem}>EXQUISITE CRAFTSMANSHIP</span>
            <span className={styles.marqueeDot}>·</span>
            <span className={styles.marqueeItem}>TIMELESS ELEGANCE</span>
            <span className={styles.marqueeDot}>·</span>
            <span className={styles.marqueeItem}>FREE WORLDWIDE SHIPPING</span>
            <span className={styles.marqueeDot}>·</span>
            <span className={styles.marqueeItem}>PURE 1-GRAM GOLD</span>
            <span className={styles.marqueeDot}>·</span>
            <span className={styles.marqueeItem}>EXQUISITE CRAFTSMANSHIP</span>
            <span className={styles.marqueeDot}>·</span>
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <h2>Iconic Pieces</h2>
            <a href="/shop" className={styles.viewAllLink}>View all &rarr;</a>
          </div>
          
          <div className={`${styles.carouselWrapper} reveal reveal-delay-1`}>
            <button className={`${styles.arrowBtn} ${styles.leftArrow}`} onClick={scrollPrev} aria-label="Scroll left">&#8249;</button>
            
            <div className={styles.embla} ref={emblaRef}>
              <div className={styles.emblaContainer}>
                {products.map((product) => (
                  <div key={product.id} className={styles.emblaSlide}>
                    <div className={styles.featuredCard}>
                      <div className={styles.cardImageWrapper}>
                        <a href="/shop" className={`${styles.cardImage} ${styles.primaryImage}`} style={{ backgroundImage: `url('${product.image}')` }} aria-label={product.title}></a>
                        <a href="/shop" className={`${styles.cardImage} ${styles.secondaryImage}`} style={{ backgroundImage: `url('${product.hoverImage}')` }} aria-label={product.title}></a>
                        <div className={styles.quickAddWrapper}>
                          <button className={styles.quickAddBtn}>Add to Bag</button>
                        </div>
                      </div>
                      <div className={styles.cardInfo}>
                        <h3><a href="/shop">{product.title}</a></h3>
                        <p>{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className={`${styles.arrowBtn} ${styles.rightArrow}`} onClick={scrollNext} aria-label="Scroll right">&#8250;</button>
          </div>
        </div>
      </section>

      {/* Editorial Lookbook Section */}
      <section className={styles.editorial}>
        <div className="container">
          <div className={`${styles.editorialHeader} reveal`}>
            <h2>The Heritage Collection</h2>
            <p className="reveal-delay-1 reveal">A curated selection of our finest 1-gram gold pieces, designed to be passed down through generations.</p>
          </div>
          
          <div className={styles.editorialGrid}>
            <div className={`${styles.edImage1} reveal`} style={{ backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80')` }}></div>
            <div className={`${styles.edText1} reveal reveal-delay-1`}>
              <h3>Artistry in Every Detail</h3>
              <p>Our master craftsmen spend hours perfecting the delicate curves and brilliant shine of each piece, ensuring that every angle catches the light beautifully. The Heritage collection represents the pinnacle of our design philosophy.</p>
              <a href="/about" className="btn-secondary" style={{ marginTop: '2rem', display: 'inline-block' }}>Discover Our Story</a>
            </div>
            <div className={`${styles.edImage2} reveal reveal-delay-2`} style={{ backgroundImage: `url('https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=800&q=80')` }}></div>
          </div>
        </div>
      </section>

    </div>
  );
}
