"use client";

import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { 
    cart, 
    totalCount, 
    subtotal, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    checkout, 
    isCheckingOut 
  } = useCart();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsCartOpen(false);
    }
  };

  return (
    <div 
      className={`${styles.drawerOverlay} ${isCartOpen ? styles.open : ''}`}
      onClick={handleOverlayClick}
      aria-hidden={!isCartOpen}
    >
      <div className={styles.drawerPanel}>
        <div className={styles.header}>
          <h2>Your Bag ({totalCount})</h2>
          <button 
            className={styles.closeBtn} 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Bag"
          >
            ✕
          </button>
        </div>

        <div className={styles.shippingBar}>
          ✨ Free Express Delivery & COD available across India
        </div>

        <div className={styles.itemList}>
          {cart.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Your shopping bag is empty.</p>
              <button 
                className="btn-secondary" 
                onClick={() => setIsCartOpen(false)}
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.variantId} className={styles.cartItem}>
                <div 
                  className={styles.itemImage} 
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className={styles.itemDetails}>
                  <div>
                    <div className={styles.itemHeader}>
                      <h4 className={styles.itemTitle}>{item.title}</h4>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.variantId)}
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                    {item.variantTitle && item.variantTitle !== 'Default Title' && (
                      <p className={styles.variantLabel}>{item.variantTitle}</p>
                    )}
                  </div>

                  <div className={styles.itemFooter}>
                    <div className={styles.qtyControl}>
                      <button 
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className={styles.qtyVal}>{item.quantity}</span>
                      <button 
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <p className={styles.price}>
                      ₹{(item.rawPrice * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotalRow}>
              <span className={styles.subtotalLabel}>Subtotal</span>
              <span className={styles.subtotalAmount}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <p className={styles.taxNotice}>Taxes included. Cash on Delivery available at checkout.</p>
            <button 
              className={styles.checkoutBtn}
              onClick={checkout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Opening Secure Checkout...' : `Proceed to Checkout · ₹${subtotal.toLocaleString('en-IN')}`}
            </button>
            <div className={styles.securityBadge}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>100% Encrypted & Secure Checkout via Shopify</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
