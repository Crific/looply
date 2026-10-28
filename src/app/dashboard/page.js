
import Image from "next/image";
import Link from "next/link";
import { Nunito } from "next/font/google";
import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export default async function DashboardPage() {
  // Check if the user is logged in
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch the user's point transactions, newest first
  const transactions = await prisma.pointTransaction.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calculate the total points earned from QR claims
  const totalPoints = transactions.reduce(
    (total, transaction) => total + transaction.pointsAmount,
    0
  );

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

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button
            type="submit"
            className="rounded-full border border-[#D9C7ED] bg-white px-5 py-2.5 text-sm font-bold text-[#7546BA] transition hover:bg-[#F0E7FA]"
          >
            Log out
          </button>
        </form>
      </nav>

      {/* Dashboard Content */}
      <div className="mx-auto max-w-5xl px-6 pb-20 pt-12">

        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            My Dashboard
          </h1>

          <p className="mt-2 text-lg text-[#796D85]">
            Welcome back, {session.user.name}!
          </p>
        </div>

        {/* Points Balance */}
        <section className="rounded-3xl bg-[#7546BA] p-8 text-white shadow-lg shadow-purple-200/40 sm:p-10">
          <p className="text-sm font-bold text-[#EADCF9]">
            My Points
          </p>

          <h2 className="mt-3 text-5xl font-extrabold tracking-tight sm:text-6xl">
            {totalPoints}
          </h2>

          <p className="mt-2 text-sm text-[#EADCF9]">
            Total points earned
          </p>
        </section>

        {/* Recent Activity */}
        <section className="mt-8 rounded-3xl border border-white bg-white/90 p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-extrabold">
            Recent Activity
          </h2>

          <p className="mt-2 text-sm text-[#796D85]">
            Your latest QR point claims.
          </p>

          {transactions.length === 0 ? (
            <p className="mt-6 text-[#796D85]">
              No transactions yet.
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-[#F0E7FA]">
              {transactions.slice(0, 5).map((transaction) => (
                <li
                  key={transaction.id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div>
                    <p className="font-bold">
                      QR Points Earned
                    </p>

                    <p className="mt-1 text-sm text-[#796D85]">
                      {transaction.createdAt.toLocaleString()}
                    </p>
                  </div>

                  <span className="whitespace-nowrap rounded-full bg-[#F0E7FA] px-4 py-2 text-sm font-extrabold text-[#7546BA]">
                    +{transaction.pointsAmount}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="mt-12 text-center text-xs text-[#9A8EA8]">
          Scan. Earn. Loop.
        </p>
      </div>
    </main>
  );
}