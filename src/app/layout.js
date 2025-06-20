import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { usePathname } from 'next/navigation'
export const metadata = {
  title: "QRify – Instant QR Code Generator",
  description: "A clean SaaS app to generate QR codes from URLs.",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    fetch("/track-metric", {
      method: "POST",
      body: JSON.stringify({ metric: "page_load", path: pathname }),
      headers: { "Content-Type": "application/json" },
    });
  }, [pathname]);
  return (
    <html lang="en">
      <body style={{ color: "#1f2937" }}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
