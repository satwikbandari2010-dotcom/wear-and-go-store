import './globals.css';
import SmoothScroll from '../components/SmoothScroll';
import MobileBottomNav from '../components/MobileBottomNav';

export const metadata = {
  title: 'Jewelry Store | 1-Gram Gold',
  description: 'Premium 1-gram gold jewelry storefront.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <header className="site-header">
            <div className="container">
              <div className="header-content">
                <a href="/" className="logo">
                  <img src="/logo.png" alt="Wear&Go" className="logo-img" />
                </a>
                <nav className="nav">
                  <ul className="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/shop">Shop Collection</a></li>
                    <li><a href="/about">Our Story</a></li>
                  </ul>
                </nav>
                <div className="nav-actions">
                  <button aria-label="Cart" className="cart-btn">Bag (0)</button>
                  <button aria-label="Menu" className="mobile-menu-btn">Menu</button>
                </div>
              </div>
            </div>
          </header>
          <main>{children}</main>
        </SmoothScroll>
        <MobileBottomNav />
      </body>
    </html>
  );
}
