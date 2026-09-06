"use client";

import { useCallback, useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { useCart } from '../context/CartContext';
import styles from './page.module.css';

export default function Home() {
  const { addToCart } = useCart();
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
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const [products, setProducts] = useState([
    { id: 1, title: 'Pink Stone Stud Earring', handle: 'pink-stone-stud-earring', price: '₹699.00', rawPrice: 699, image: 'https://cdn.shopify.com/s/files/1/0834/6818/9954/files/2.jpg?v=1787744806', hoverImage: 'https://cdn.shopify.com/s/files/1/0834/6818/9954/files/1.jpg?v=1787744214', variantId: 'gid://shopify/ProductVariant/48387646324994' },
    { id: 2, title: 'Green Stone Stud Earring', handle: 'green-stone-stud-earring', price: '₹699.00', rawPrice: 699, image: 'https://cdn.shopify.com/s/files/1/0834/6818/9954/files/Green_1.jpg?v=1788282689', hoverImage: 'https://cdn.shopify.com/s/files/1/0834/6818/9954/files/Green_2.jpg?v=1788282790', variantId: 'gid://shopify/ProductVariant/48424026964226' },
    { id: 3, title: 'Ruby Blossom Jewellery Set', handle: 'ruby-blossom-jewellery-set', price: '₹999.00', rawPrice: 999, image: 'https://cdn.shopify.com/s/files/1/0834/6818/9954/files/Necklace_1.jpg?v=1788292188', hoverImage: 'https://cdn.shopify.com/s/files/1/0834/6818/9954/files/Necklace_2.jpg?v=1788292225', variantId: 'gid://shopify/ProductVariant/48424300183810' }
  ]);

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
                {products.map((product) => {
                  const productHref = product.handle ? `/shop/${product.handle}` : '/shop';
                  return (
                    <div key={product.id} className={styles.emblaSlide}>
                      <div className={styles.featuredCard}>
                        <div className={styles.cardImageWrapper}>
                          <Link href={productHref} className={`${styles.cardImage} ${styles.primaryImage}`} style={{ backgroundImage: `url('${product.image}')` }} aria-label={product.title}></Link>
                          <Link href={productHref} className={`${styles.cardImage} ${styles.secondaryImage}`} style={{ backgroundImage: `url('${product.hoverImage}')` }} aria-label={product.title}></Link>
                          <div className={styles.quickAddWrapper}>
                            <button 
                              className={styles.quickAddBtn}
                              onClick={(e) => {
                                e.preventDefault();
                                if (product.variantId) {
                                  addToCart(product, 1);
                                }
                              }}
                            >
                              Add to Bag
                            </button>
                          </div>
                        </div>
                        <div className={styles.cardInfo}>
                          <h3><Link href={productHref}>{product.title}</Link></h3>
                          <p>{product.price}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
