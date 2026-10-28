import Image from "next/image";
import Link from "next/link";
import { Nunito } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

const steps = [
  {
    number: "01",
    title: "Scan",
    description:
      "Find a Looply QR code and scan it with your phone.",
  },
  {
    number: "02",
    title: "Earn",
    description:
      "Collect points automatically with every valid scan.",
  },
  {
    number: "03",
    title: "Track",
    description:
      "See your points balance and recent activity in one place.",
  },
];

export default function HomePage() {
  return (
    <main
      className={`${nunito.className} min-h-screen bg-gradient-to-b from-[#F8F4FF] via-[#F3EBFC] to-[#F8F4FF] text-[#30213D]`}
    >
      {/* Navigation */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center">
          <Image
            src="/looply-logo.png"
            alt="Looply Logo"
            width={180}
            height={75}
            className="h-auto w-32 sm:w-44"
            priority
          />
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-bold transition hover:text-[#7546BA]"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-[#7546BA] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#63369F]"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-16 text-center md:pt-24">
        <span className="mb-6 rounded-full bg-[#EDE1FA] px-5 py-2 text-sm font-bold text-[#7546BA]">
          A little loyalty goes a long way
        </span>

        <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
          Scan. Earn.
          <span className="text-[#7546BA]"> Loop.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#796D85]">
          Every visit deserves a little something extra.
          Scan QR codes, collect points, and make every
          visit count with Looply.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-full bg-[#7546BA] px-8 py-3 font-bold text-white shadow-sm transition hover:bg-[#63369F] hover:shadow-md"
          >
            Start Earning →
          </Link>

          <a
            href="#how-it-works"
            className="rounded-full border border-[#D9C7ED] bg-white px-8 py-3 font-bold text-[#7546BA] transition hover:bg-[#F0E7FA]"
          >
            How It Works
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="scroll-mt-16 px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                It's as easy as 1, 2, 3.
              </h2>

              <p className="mt-4 text-lg text-[#796D85]">
                No complicated steps. Just scan and earn.
              </p>
            </div>
          </ScrollReveal>

          {/* Stagger the card animations */}
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <ScrollReveal
                key={step.number}
                delay={index * 150}
                className="h-full"
              >
                <div className="h-full rounded-3xl border border-white/70 bg-white/80 p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md">
                  <span className="text-4xl font-extrabold text-[#B99ADD]">
                    {step.number}
                  </span>

                  <h3 className="mt-6 text-2xl font-extrabold">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-[#796D85]">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-20">
        <ScrollReveal>
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#7546BA] px-8 py-16 text-center text-white shadow-lg shadow-purple-200/40 md:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Ready to get in the loop?
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#EADCF9]">
              Create your account and start collecting
              points with Looply.
            </p>

            <Link
              href="/signup"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-bold text-[#7546BA] transition hover:bg-[#F2E9FC]"
            >
              Join Looply →
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href="/">
            <Image
              src="/looply-logo.png"
              alt="Looply"
              width={140}
              height={60}
              className="h-auto w-28 sm:w-32"
            />
          </Link>

          <p className="text-sm font-medium text-[#796D85]">
            © {new Date().getFullYear()} Looply. Scan. Earn. Loop.
          </p>
        </div>
      </footer>
    </main>
  );
}
