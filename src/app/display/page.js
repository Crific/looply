"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function DisplayPage() {
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let interval;

    async function generateQR() {
      try {
        // Request a new QR token from the backend
        const response = await fetch("/api/display", {
          method: "POST",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to generate QR code");
        }

        // Update the displayed QR code
        if (active) {
          setQrCode(data);
          setError("");
        }
      } catch (error) {
        if (active) {
          setQrCode(null);
          setError(error.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    // Generate the first QR code
    generateQR();

    // Generate a new QR code every 30 seconds
    interval = setInterval(generateQR, 30000);

    // Stop the interval when leaving the page
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  // Generate the URL customers will visit after scanning
  const claimUrl = qrCode
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/claim/${qrCode.token}`
    : "";

  return (
    <main>
      <h1>Looply QR Display</h1>

      <h2>Scan to Earn Points</h2>

      <p>Scan the QR code to earn 10 points.</p>

      {error && <p role="alert">{error}</p>}

      {loading && <p>Generating QR code...</p>}

      {!loading && qrCode && (
        <section>
          <QRCodeSVG
            value={claimUrl}
            size={250}
            marginSize={4}
          />

          <p>Points Value: {qrCode.pointsValue}</p>

          <p>
            Expires:{" "}
            {new Date(qrCode.expiresAt).toLocaleTimeString()}
          </p>

          <p>QR code refreshes every 30 seconds.</p>

        </section>
      )}
    </main>
  );
}