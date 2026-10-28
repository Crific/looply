"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export default function SignupPage() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    // Read the signup form values
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirm = formData.get("confirm");

    // Send registration details to the backend
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirm,
      }),
    });

    // Redirect to login after successful registration
    if (response.ok) {
      router.push("/login");
    }
  }

  return (
    <main
      className={`${nunito.className} flex min-h-screen items-center justify-center bg-gradient-to-b from-[#F8F4FF] via-[#F3EBFC] to-[#F8F4FF] px-6 py-12 text-[#30213D]`}
    >
      <div className="w-full max-w-md">

        {/* Looply Logo */}
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

        {/* Signup Form */}
        <div className="rounded-3xl border border-white bg-white/90 p-8 shadow-xl shadow-purple-200/30 sm:p-10">
          <h1 className="text-center text-3xl font-extrabold">
            Join the loop!
          </h1>

          <p className="mt-2 text-center text-sm text-[#796D85]">
            Create your account and start earning points.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="w-full rounded-xl border border-[#E3D8F0] bg-[#FCFAFF] px-4 py-3 outline-none focus:border-[#7546BA] focus:ring-2 focus:ring-[#7546BA]/15"
              />
            </div>

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
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-[#E3D8F0] bg-[#FCFAFF] px-4 py-3 outline-none focus:border-[#7546BA] focus:ring-2 focus:ring-[#7546BA]/15"
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
                placeholder="Create a password"
                required
                className="w-full rounded-xl border border-[#E3D8F0] bg-[#FCFAFF] px-4 py-3 outline-none focus:border-[#7546BA] focus:ring-2 focus:ring-[#7546BA]/15"
              />
            </div>

            <div>
              <label
                htmlFor="confirm"
                className="mb-2 block text-sm font-bold"
              >
                Confirm Password
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="Confirm your password"
                required
                className="w-full rounded-xl border border-[#E3D8F0] bg-[#FCFAFF] px-4 py-3 outline-none focus:border-[#7546BA] focus:ring-2 focus:ring-[#7546BA]/15"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#7546BA] px-6 py-3 font-bold text-white transition hover:bg-[#63369F]"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#796D85]">
            Already in the loop?{" "}
            <Link
              href="/login"
              className="font-extrabold text-[#7546BA] hover:underline"
            >
              Log in
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