'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const CTAButton = ({ children }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <button
        style={{
          padding: '14px 32px',
          fontSize: '1rem',
          backgroundColor: 'transparent',
          color: 'black',
          border: '2px solid black',
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'all 0.3s ease-in-out',
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </button>
    );
  };

  const HeroSection = () => (
    <section
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px 20px',
        gap: '40px',
        flexWrap: 'wrap',
        background: 'linear-gradient(to right, #e0f2fe, #f8fafc)',
      }}
    >
      <div style={{ maxWidth: '480px', textAlign: 'left' }}>
        <h1 style={{ fontSize: '2.75rem', fontWeight: 700, marginBottom: '20px' }}>
          Create Shareable QR Codes Instantly
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '30px' }}>
          QRify lets you transform any link into a clean, secure, and downloadable QR code in just one click.
        </p>
        <Link href="/generate">
          <CTAButton>Get Started</CTAButton>
        </Link>
      </div>
      <img
        src="https://media.istockphoto.com/id/1896032076/vector/hand-holding-mobile-phone-in-the-process-of-scanning-qr-code-concept-flat-illustration.jpg?s=612x612&w=0&k=20&c=rSWGjzGYBo6DfBFy38iLBxBYOYPg-t0UABYW5rUwLFs="
        alt="QR code scan illustration"
        style={{
          width: '340px',
          height: 'auto',
          borderRadius: '12px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
        }}
      />
    </section>
  );

  const FeaturesSection = () => {
    const features = [
      {
        title: 'Fast & Reliable',
        desc: 'Generate codes in real time with 99.9% uptime.',
        img: 'https://cdn-icons-png.flaticon.com/512/55/55240.png',
      },
      {
        title: 'Secure Storage',
        desc: 'Backed by cloud storage (AWS S3).',
        img: 'https://cdn-icons-png.flaticon.com/512/95/95454.png',
      },
      {
        title: 'Free & Flexible',
        desc: 'Built on open technologies, no hidden fees.',
        img: 'https://static.thenounproject.com/png/4211539-200.png',
      },
    ];

    return (
      <section style={{ backgroundColor: '#ffffff', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Why QRify?</h2>
        <p style={{ color: '#6b7280', marginBottom: '40px' }}>
          Built for speed, simplicity, and scalability.
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            flexWrap: 'wrap',
          }}
        >
          {features.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#f1f5f9',
                padding: '30px',
                borderRadius: '12px',
                width: '280px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: '48px',
                  height: '48px',
                  marginBottom: '16px',
                }}
              />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: '#1e293b' }}>
                {item.title}
              </h3>
              <p style={{ color: '#64748b' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <main
      style={{
        fontFamily: 'Inter, sans-serif',
        backgroundColor: '#f9fafb',
        color: '#1f2937',
        lineHeight: '1.6',
        overflowX: 'hidden',
      }}
    >
      {HeroSection()}
      {FeaturesSection()}
    </main>
  );
}
