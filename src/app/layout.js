'use client';
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { usePathname } from "next/navigation";


export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/increment-page-load', { method: 'POST' });
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
