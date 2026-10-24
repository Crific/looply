"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    // Stop the page from refreshing
    event.preventDefault();

    // Clear previous login errors
    setError("");

    // Read the email and password from the form
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    // Send login information to Auth.js
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // Read the authentication response
      if (result?.error || !result?.ok) {
        setError("Invalid email or password");
        return;
      }

      // Redirect to dashboard if login succeeds
      router.push("/dashboard");
      router.refresh();

    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input name="email" type="email" required />
        </div>

        <div>
          <label>Password</label>
          <input name="password" type="password" required />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </main>
  );
}