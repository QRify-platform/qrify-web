"use client";

import { useState } from "react";
import axios from "axios";

export default function Generate() {
  const [url, setUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [hovered, setHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      const res = await axios.post(`${baseUrl}/generate-qr/?url=${url}`);
      setQrCodeUrl(res.data.qr_code_url);
    } catch (error) {
      console.error("QR code generation error:", error);
    }
  };

  const TitleSection = () => (
    <h1
      style={{
        fontSize: "2.5rem",
        fontWeight: 700,
        marginBottom: "40px",
        textAlign: "center",
      }}
    >
      Generate a QR Code
    </h1>
  );

  const QRForm = () => (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        style={{
          padding: "14px",
          fontSize: "1rem",
          border: "1px solid #cbd5e1",
          width: "100%",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "14px 32px",
          fontSize: "1rem",
          backgroundColor: "transparent",
          color: "black",
          border: "2px solid black",
          cursor: "pointer",
          fontWeight: 600,
          transition: "all 0.3s ease-in-out",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Generate
      </button>
    </form>
  );

  const QRPreview = () =>
    qrCodeUrl && (
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>Your QR Code:</p>
        <img
          src={qrCodeUrl}
          alt="QR Code"
          style={{
            width: "200px",
            height: "200px",
            marginTop: "10px",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
          }}
        />
      </div>
    );

  return (
    <main
      style={{
        padding: "80px 20px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        color: "#1f2937",
        backgroundImage: 'url("/qr-pattern.webp")',
        backgroundRepeat: "repeat",
        backgroundSize: "300px",
        backgroundBlendMode: "overlay",
        opacity: 0.98,
      }}
    >
      {TitleSection()}
      {QRForm()}
      {QRPreview()}
    </main>
  );
}
