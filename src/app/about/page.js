"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './about.module.css';

export default function About() {
  // Activate scroll reveal intersection observer
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
    <div className={styles.aboutPage}>
      
      {/* Hero Header */}
      <section className={styles.heroSection}>
        <span className={`${styles.heroTagline} reveal`}>The Philosophy of Wear & Go</span>
        <h1 className={`${styles.heroTitle} reveal reveal-delay-1`}>
          Pure Gold Elegance.<br />Without the Locker Anxiety.
        </h1>
        <p className={`${styles.heroSubtitle} reveal reveal-delay-2`}>
          We believe true luxury isn't meant to be locked inside a dark bank vault for a once-a-year occasion. It belongs in the sunlight, on your skin, every single day.
        </p>
      </section>

      {/* Chapter 1 */}
      <section className={styles.storySection}>
        <div className={styles.storyRow}>
          <div className={`${styles.storyImageWrap} reveal`}>
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80" 
              alt="Crafting Fine Gold Jewelry" 
              className={styles.storyImage}
            />
          </div>
          <div className={`${styles.storyContent} reveal reveal-delay-1`}>
            <span className={styles.chapterNumber}>Chapter I · The Dilemma</span>
            <h2 className={styles.storyHeading}>Why should beauty wait for a wedding?</h2>
            <p className={styles.storyText}>
              For generations, gold has been revered as the ultimate symbol of timeless beauty and grace. But as prices skyrocketed, fine jewelry transformed from an everyday adornment into a source of constant worry.
            </p>
            <p className={styles.storyText}>
              Women found themselves trapped between two undesirable choices: risking heavily priced solid gold in public, or settling for cheap imitation brass that turns black, oxidizes, and irritates the skin within weeks.
            </p>
            <p className={styles.storyText}>
              We founded <strong>Wear & Go</strong> to shatter that compromise forever.
            </p>
          </div>
        </div>

        {/* Chapter 2 */}
        <div className={styles.storyRowReverse}>
          <div className={`${styles.storyImageWrap} reveal`}>
            <img 
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80" 
              alt="1-Gram Gold Radiant Shine" 
              className={styles.storyImage}
            />
          </div>
          <div className={`${styles.storyContent} reveal reveal-delay-1`}>
            <span className={styles.chapterNumber}>Chapter II · The Breakthrough</span>
            <h2 className={styles.storyHeading}>The 1-Gram Gold Revolution</h2>
            <p className={styles.storyText}>
              Our master artisans developed a proprietary molecular bonding process that permanently coats a hypoallergenic, skin-friendly core with authentic 1-gram 24-karat pure gold.
            </p>
            <p className={styles.storyText}>
              To the naked eye and touch, it is virtually indistinguishable from solid gold. It possesses the exact same deep golden warmth, the identical satisfying heft, and the mesmerizing mirror polish that catches the light from across the room.
            </p>
            <p className={styles.storyText}>
              Finally, you can achieve that quiet luxury, royalty-inspired aesthetic without spending a fortune.
            </p>
          </div>
        </div>

        {/* Chapter 3 */}
        <div className={styles.storyRow}>
          <div className={`${styles.storyImageWrap} reveal`}>
            <img 
              src="https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=1000&q=80" 
              alt="Effortless Modern Jewelry" 
              className={styles.storyImage}
            />
          </div>
          <div className={`${styles.storyContent} reveal reveal-delay-1`}>
            <span className={styles.chapterNumber}>Chapter III · The Promise</span>
            <h2 className={styles.storyHeading}>Engineered to 'Wear & Go'</h2>
            <p className={styles.storyText}>
              Our jewelry isn't fragile. Each piece is sealed with an invisible anti-tarnish and moisture-resistant barrier that shields it from daily sweat, humidity, and perfume.
            </p>
            <p className={styles.storyText}>
              Whether you are rushing to a boardroom presentation, attending your best friend's sangeet, or enjoying a Sunday brunch in the city—you simply put it on and walk out the door with effortless poise.
            </p>
            <p className={styles.storyText}>
              <strong>No hesitation. No bank trips. Just pure, unapologetic confidence.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className={`${styles.quoteBanner} reveal`}>
        <div className={styles.quoteInner}>
          <p className={styles.quoteText}>
            “Jewelry should never make you feel cautious. It should make you feel completely, effortlessly radiant.”
          </p>
          <span className={styles.quoteAuthor}>The Wear & Go Design Atelier</span>
        </div>
      </section>

      {/* 3 Brand Pillars */}
      <section className={styles.pillarsSection}>
        <h2 className={`${styles.pillarsTitle} reveal`}>Our Core Standards</h2>
        <p className={`${styles.pillarsSubtitle} reveal reveal-delay-1`}>
          Every piece in our catalog is governed by three non-negotiable principles of modern fine jewelry.
        </p>

        <div className={styles.pillarsGrid}>
          <div className={`${styles.pillarCard} reveal`}>
            <span className={styles.pillarIcon}>✨</span>
            <h3 className={styles.pillarHeading}>Pure 1-Gram 24k Gold</h3>
            <p className={styles.pillarText}>
              Genuine gold micro-plating that delivers authentic radiance, weight, and timeless luxury without compromise.
            </p>
          </div>

          <div className={`${styles.pillarCard} reveal reveal-delay-1`}>
            <span className={styles.pillarIcon}>🛡️</span>
            <h3 className={styles.pillarHeading}>Anti-Tarnish & Waterproof</h3>
            <p className={styles.pillarText}>
              Treated with a specialized protective sealant engineered to resist daily wear, moisture, humidity, and fading.
            </p>
          </div>

          <div className={`${styles.pillarCard} reveal reveal-delay-2`}>
            <span className={styles.pillarIcon}>🌿</span>
            <h3 className={styles.pillarHeading}>100% Skin-Friendly</h3>
            <p className={styles.pillarText}>
              Completely lead-free, nickel-free, and hypoallergenic. Designed specifically for sensitive skin to wear for hours without irritation.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className={`${styles.ctaSection} reveal`}>
        <h2 className={styles.ctaTitle}>Experience the Glow</h2>
        <p className={styles.ctaText}>
          Discover our curated collection of bestselling earrings, drop pendants, and royal jewelry sets crafted for the modern woman.
        </p>
        <Link href="/shop" className={styles.ctaBtn}>
          Explore The Collection &rarr;
        </Link>
      </section>

    </div>
  );
}
