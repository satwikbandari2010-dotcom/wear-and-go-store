import './globals.css';
import SmoothScroll from '../components/SmoothScroll';
import MobileBottomNav from '../components/MobileBottomNav';
import SmartHeader from '../components/SmartHeader';

export const metadata = {
  title: 'Jewelry Store | 1-Gram Gold',
  description: 'Premium 1-gram gold jewelry storefront.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <SmartHeader />
          <main>{children}</main>
        </SmoothScroll>
        <MobileBottomNav />
      </body>
    </html>
  );
}
