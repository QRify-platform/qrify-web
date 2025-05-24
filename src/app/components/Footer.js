// app/Footer.tsx
export default function Footer() {
    return (
      <footer style={{
        backgroundColor: '#f1f5f9',
        padding: '30px',
        textAlign: 'center',
        marginTop: '60px',
        color: '#64748b',
        fontSize: '0.9rem'
      }}>
        © {new Date().getFullYear()} QRify. All rights reserved.
      </footer>
    );
  }
  