import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'QRify – Instant QR Code Generator',
  description: 'A clean SaaS app to generate QR codes from URLs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f9fafb', color: '#1f2937' }}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
