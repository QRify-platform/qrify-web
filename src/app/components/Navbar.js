'use client';
import Link from 'next/link';
import Image from 'next/image';
export default function Navbar() {
  const linkStyle = {
    color: '#1f2937',
    textDecoration: 'none',
    fontWeight: 500,
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        padding: '20px 40px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        fontWeight: 600,
        fontSize: '1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Image width={130} height={40} src='/logo.png'></Image>
      <div style={{ display: 'flex', gap: '20px', fontSize: '1rem' }}>
        <Link href="/" style={linkStyle}>
          Home
        </Link>
        <Link href="/generate" style={linkStyle}>
          Generate
        </Link>
      </div>
    </nav>
  );
}
