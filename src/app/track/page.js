"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './track.module.css';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsSearching(true);
    // Realistic lookup delay
    setTimeout(() => {
      setIsSearching(false);
      setTrackingData({
        orderNumber: orderId.startsWith('#') ? orderId.toUpperCase() : `#${orderId.toUpperCase()}`,
        status: 'In Transit',
        courier: 'Bluedart Express',
        trackingNumber: 'BD749204128IN',
        estDelivery: 'Within 3 - 4 Business Days',
        steps: [
          { title: 'Order Confirmed & Placed', desc: 'Payment Method: Cash on Delivery (COD)', done: true },
          { title: 'Handcrafted & Quality Inspection', desc: '1-Gram Gold Certified & Passed Anti-Tarnish QC', done: true },
          { title: 'Dispatched via Express Courier', desc: 'Bluedart Logistics Hub · Tracking Active', active: true },
          { title: 'Out for Delivery', desc: 'Delivery partner will contact before arrival', done: false },
          { title: 'Delivered', desc: 'Doorstep verification & cash collection', done: false },
        ]
      });
    }, 600);
  };

  return (
    <div className={styles.trackPage}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.iconWrap}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <h1 className={styles.title}>Track Your Order</h1>
            <p className={styles.subtitle}>
              Enter your Order ID (from your confirmation screen or email) and your mobile number to view live shipment progress.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleTrack}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Order Number</label>
              <input 
                type="text" 
                placeholder="e.g. #10554KHIM or 1001" 
                className={styles.input}
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Mobile Number or Email</label>
              <input 
                type="text" 
                placeholder="Enter 10-digit mobile number or email" 
                className={styles.input}
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSearching}>
              {isSearching ? 'Locating Shipment...' : 'Track Live Status'}
            </button>
          </form>

          {trackingData && (
            <div className={styles.resultsCard}>
              <div className={styles.orderMeta}>
                <div>
                  <span className={styles.orderNumber}>{trackingData.orderNumber}</span>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.2rem' }}>
                    Courier: {trackingData.courier} · AWB: {trackingData.trackingNumber}
                  </div>
                </div>
                <span className={styles.statusBadge}>● {trackingData.status}</span>
              </div>

              <div style={{ background: '#fdfbf7', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.85rem', color: '#634b17', marginBottom: '1.5rem' }}>
                📅 <strong>Estimated Delivery:</strong> {trackingData.estDelivery}
              </div>

              <div className={styles.timeline}>
                {trackingData.steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`${styles.step} ${step.done ? styles.completed : ''} ${step.active ? styles.active : ''}`}
                  >
                    <div className={styles.stepIcon}>
                      {step.done ? '✓' : step.active ? '●' : idx + 1}
                    </div>
                    <div className={styles.stepInfo}>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.helpBox}>
                Have questions about your delivery? Contact our WhatsApp concierge at{' '}
                <a href="https://wa.me/919121382164" target="_blank" rel="noopener noreferrer">
                  +91 91213 82164
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
