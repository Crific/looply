
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl");

  // Return to the QR claim page after login, if applicable
  const destination =
    callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")
      ? callbackUrl
      : "/dashboard";

  async function handleSubmit(event) {
    event.preventDefault();

    // Reset previous errors and show the loading state
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // Authenticate the user with NextAuth credentials
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error || !result?.ok) {
        setError("Invalid email or password");
        return;
      }

      // Redirect to the original claim URL or dashboard
      router.push(destination);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className={`${nunito.className} flex min-h-screen items-center justify-center bg-gradient-to-b from-[#F8F4FF] via-[#F3EBFC] to-[#F8F4FF] px-6 py-12 text-[#30213D]`}
    >
      <div className="w-full max-w-md">

        {/* Looply branding */}
        <Link href="/" className="mb-8 flex justify-center">
          <Image
            src="/looply-logo.png"
            alt="Looply Logo"
            width={180}
            height={75}
            className="h-auto w-40"
            priority
          />
        </Link>

        {/* Login form */}
        <div className="rounded-3xl border border-white bg-white/90 p-8 shadow-xl shadow-purple-200/30 sm:p-10">
          <h1 className="text-center text-3xl font-extrabold">
            Welcome back!
          </h1>

          <p className="mt-2 text-center text-sm text-[#796D85]">
            Log in to keep earning with Looply.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-[#E3D8F0] bg-[#FCFAFF] px-4 py-3 outline-none transition focus:border-[#7546BA] focus:ring-2 focus:ring-[#7546BA]/15"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-[#E3D8F0] bg-[#FCFAFF] px-4 py-3 outline-none transition focus:border-[#7546BA] focus:ring-2 focus:ring-[#7546BA]/15"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#7546BA] px-6 py-3 font-bold text-white transition hover:bg-[#63369F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#796D85]">
            New to Looply?{" "}
            <Link
              href="/signup"
              className="font-extrabold text-[#7546BA] hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-[#9A8EA8]">
          Scan. Earn. Loop.
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  // Suspense supports reading search parameters in the App Router
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F4FF]" />}>
      <LoginForm />
    </Suspense>
  );
}
