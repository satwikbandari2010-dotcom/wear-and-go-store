"use client";

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';
import styles from '../item/item.module.css';

export default function ProductDetail({ params }) {
  const unwrappedParams = use(params);
  const handle = unwrappedParams.handle;

  const { cart, addToCart, buyNow, isCheckingOut } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openTab, setOpenTab] = useState('desc');
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  const cartItem = cart?.find(item => item.variantId === selectedVariant?.id);

  // Sync quantity with cart item if it exists in cart
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem?.quantity, selectedVariant?.id]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${handle}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (err) {
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    }
    if (handle) {
      fetchProduct();
    }
  }, [handle]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: `${product.title} - Wear & Go`,
          text: `Check out ${product.title} in pure 1-gram gold!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const currentPrice = selectedVariant?.price || product?.price || '₹0';
  const currentRawPrice = selectedVariant?.rawPrice || product?.rawPrice || 0;
  const isAvailable = selectedVariant?.availableForSale ?? product?.availableForSale ?? true;
  const totalAmount = currentRawPrice * quantity;
  const formattedTotal = `₹${totalAmount.toLocaleString('en-IN')}`;

  const handleAdd = () => {
    if (!product || !selectedVariant || !isAvailable) return;
    addToCart({
      id: product.id,
      title: product.title,
      handle: product.handle,
      price: currentPrice,
      rawPrice: currentRawPrice,
      image: product.images[0],
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title
    }, quantity, true);
  };

  const handleCodBuy = () => {
    if (!product || !selectedVariant || !isAvailable) return;
    buyNow({
      id: product.id,
      title: product.title,
      handle: product.handle,
      price: currentPrice,
      rawPrice: currentRawPrice,
      image: product.images[0],
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title
    }, quantity);
  };

  if (loading) {
    return (
      <div className={styles.productPage} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', letterSpacing: '1px' }}>Loading luxury details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.productPage} style={{ textAlign: 'center', padding: '160px 20px' }}>
        <h2>Product Not Found</h2>
        <p style={{ margin: '1.5rem 0', color: '#666' }}>The jewelry piece you are looking for is no longer available.</p>
        <Link href="/shop" className="btn-primary">Return to Collection</Link>
      </div>
    );
  }

  const activeImage = product.images[selectedImageIndex] || product.images[0];

  return (
    <div className={styles.productPage}>
      <div className={styles.container}>
        <div className={styles.productGrid}>
          
          {/* Left: Gallery */}
          <div className={styles.imageGallery}>
            <div 
              className={styles.mainImage} 
              style={{ backgroundImage: `url('${activeImage}')` }}
            />
            
            {product.images.length > 1 && (
              <div className={styles.thumbRow}>
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`${styles.thumb} ${selectedImageIndex === idx ? styles.activeThumb : ''}`}
                    style={{ backgroundImage: `url('${img}')` }}
                    onClick={() => setSelectedImageIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className={styles.productInfo}>
            <div className={styles.breadcrumb}>
              <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / {product.title}
            </div>

            <div className={styles.titleArea}>
              <h1 className={styles.title}>{product.title}</h1>
              <button onClick={handleShare} className={styles.shareBtn} aria-label="Share">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
              </button>
            </div>

            <div className={styles.priceArea}>
              <p className={styles.price}>{currentPrice}</p>
              <p className={styles.taxNote}>MRP (Inclusive of all taxes)</p>
            </div>

            <div className={styles.stockBadge}>
              <span className={styles.stockDot} style={{ background: isAvailable ? '#1a8917' : '#dc2626' }} />
              <span style={{ color: isAvailable ? '#1a8917' : '#dc2626' }}>
                {isAvailable ? 'In Stock, Ready to Dispatch' : 'Currently Sold Out'}
              </span>
            </div>

            {/* Options / Variants */}
            {product.options && product.options.length > 0 && product.variants.length > 1 && (
              <div className={styles.variantSection}>
                {product.options.map((opt) => (
                  <div key={opt.name}>
                    <p className={styles.variantLabel}>Select {opt.name}:</p>
                    <div className={styles.variantPills}>
                      {product.variants.map((variant) => {
                        const isSelected = selectedVariant?.id === variant.id;
                        return (
                          <button
                            key={variant.id}
                            className={`${styles.variantPill} ${isSelected ? styles.activePill : ''}`}
                            onClick={() => setSelectedVariant(variant)}
                          >
                            {variant.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity + Actions */}
            <div className={styles.purchaseArea}>
              <div className={styles.qtyWrapper}>
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>QUANTITY</span>
                <div className={styles.qtyBox}>
                  <button 
                    className={styles.qtyBtn} 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className={styles.qtyInput}>{quantity}</span>
                  <button 
                    className={styles.qtyBtn} 
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.btnGroup}>
                <button 
                  className={styles.addToBagBtn} 
                  onClick={handleAdd}
                  disabled={!isAvailable}
                >
                  {isAvailable ? `Add to Bag · ${formattedTotal}` : 'Sold Out'}
                </button>

                <button 
                  className={styles.codBtn} 
                  onClick={handleCodBuy}
                  disabled={!isAvailable || isCheckingOut}
                >
                  {isCheckingOut ? 'Opening Cash on Delivery...' : `Buy with Cash on Delivery (COD) · ${formattedTotal}`}
                </button>
              </div>
            </div>

            <div className={styles.deliveryBanner}>
              <span>⚡</span>
              <span><strong>Free Express Shipping:</strong> Dispatched in 24 hrs · COD Available across India</span>
            </div>

            {/* Trust Badges */}
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

            {/* Accordions */}
            <div className={styles.accordions}>
              <div className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader} 
                  onClick={() => setOpenTab(openTab === 'desc' ? '' : 'desc')}
                >
                  <span>Product Description & Craftsmanship</span>
                  <span>{openTab === 'desc' ? '−' : '+'}</span>
                </button>
                {openTab === 'desc' && (
                  <div className={styles.accordionContent}>
                    <p>{product.description || 'Crafted with certified 1-gram pure gold micro-plating over an anti-tarnish core. Provides the authentic weight, radiant glow, and timeless elegance of solid gold for daily and special wear.'}</p>
                  </div>
                )}
              </div>

              <div className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader} 
                  onClick={() => setOpenTab(openTab === 'care' ? '' : 'care')}
                >
                  <span>Materials & Care Guide</span>
                  <span>{openTab === 'care' ? '−' : '+'}</span>
                </button>
                {openTab === 'care' && (
                  <div className={styles.accordionContent}>
                    <ul>
                      <li>Authentic 1-Gram Gold micro-plating</li>
                      <li>Water-resistant & sweat-resistant protective seal</li>
                      <li>Wipe gently with a soft micro-fiber cloth after use</li>
                      <li>Avoid direct contact with perfumes and harsh household chemicals</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader} 
                  onClick={() => setOpenTab(openTab === 'shipping' ? '' : 'shipping')}
                >
                  <span>Shipping, Returns & COD Policy</span>
                  <span>{openTab === 'shipping' ? '−' : '+'}</span>
                </button>
                {openTab === 'shipping' && (
                  <div className={styles.accordionContent}>
                    <p>We offer free express delivery throughout India (3-5 working days). Cash on Delivery is available with zero extra charges. If you are not 100% delighted with your purchase, enjoy our hassle-free 7-Day doorstep exchange and replacement guarantee.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Sticky Mobile Bar */}
      <div className={`${styles.stickyFooter} ${isScrolledPastHero ? styles.stickyVisible : ''}`}>
        <div className={styles.stickyContent}>
          <div className={styles.stickyInfo}>
            <h4>{product.title}</h4>
            <p>{currentPrice}</p>
          </div>
          <button 
            className={`btn-primary ${styles.stickyBtn}`} 
            onClick={handleAdd}
            disabled={!isAvailable}
          >
            {isAvailable ? 'Add to Bag' : 'Sold Out'}
          </button>
        </div>
      </div>

    </div>
  );
}
