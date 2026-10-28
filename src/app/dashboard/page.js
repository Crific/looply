import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

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
    <main>
      <h1>Dashboard</h1>

      <h2>Welcome, {session.user.name}!</h2>

      <section>
        <h3>My Points</h3>
        <p>Current Balance: {totalPoints} points</p>
      </section>

      <section>
        <h3>Recent Activity</h3>

        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul>
            {/* Display the five most recent QR claims */}
            {transactions.slice(0, 5).map((transaction) => (
              <li key={transaction.id}>
                +{transaction.pointsAmount} points
                {" - "}
                {transaction.createdAt.toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Sign out and return to login */}
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </main>
  );
}