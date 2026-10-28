
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ClaimClient({ token }) {
  const router = useRouter();
  const started = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Prevent repeated requests from this component instance
    if (started.current) return;
    started.current = true;

    async function claimPoints() {
      try {
        const response = await fetch("/api/claim", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Unable to claim points.");
          return;
        }

        // Redirect once the points have been saved
        router.replace("/dashboard");
      } catch {
        setError("Something went wrong.");
      }
    }

    claimPoints();
  }, [token, router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>Claiming your points...</p>
      )}
    </main>
  );
}
