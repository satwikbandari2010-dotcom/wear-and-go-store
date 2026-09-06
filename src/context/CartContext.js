"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('wear_and_go_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('wear_and_go_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.rawPrice * item.quantity), 0);

  const addToCart = (product, quantity = 1, isExplicitQuantity = false) => {
    if (!product.variantId) return;

    if (typeof window !== 'undefined' && window.navigator?.vibrate) {
      window.navigator.vibrate(50);
    }

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.variantId === product.variantId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        if (isExplicitQuantity) {
          updated[existingIndex].quantity = quantity;
        } else {
          updated[existingIndex].quantity += quantity;
        }
        return updated;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (variantId) => {
    setCart(prev => prev.filter(item => item.variantId !== variantId));
  };

  const updateQuantity = (variantId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.variantId === variantId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const checkout = async () => {
    if (cart.length === 0 || isCheckingOut) return;
    setIsCheckingOut(true);

    try {
      const lines = cart.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity
      }));

      const res = await fetch('/api/cart/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines })
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert('Could not initiate checkout. Please try again.');
        setIsCheckingOut(false);
      }
    } catch (e) {
      console.error('Checkout error:', e);
      alert('Error connecting to checkout. Please try again.');
      setIsCheckingOut(false);
    }
  };

  const buyNow = async (product, quantity = 1) => {
    if (!product.variantId || isCheckingOut) return;
    setIsCheckingOut(true);

    try {
      const lines = [{
        merchandiseId: product.variantId,
        quantity: quantity
      }];

      const res = await fetch('/api/cart/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines })
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert('Could not initiate checkout. Please try again.');
        setIsCheckingOut(false);
      }
    } catch (e) {
      console.error('Direct buy error:', e);
      alert('Error initiating checkout.');
      setIsCheckingOut(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      totalCount,
      subtotal,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      checkout,
      buyNow,
      isCheckingOut
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
