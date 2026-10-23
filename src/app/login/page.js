"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event) {
    // Stop the page from refreshing
    event.preventDefault();

    // Read the email and password from the form
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    // Send login information to the backend
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // Read the backend response
    const data = await response.json();

    // Redirect to dashboard if login succeeds
    if (response.ok) {
      router.push("/dashboard");
      return;
    }

    console.log(data.error);
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

        <button type="submit">Login</button>
      </form>
    </main>
  );
}