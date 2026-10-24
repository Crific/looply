// Basic user dashboard - WIP

import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // Check the current user's session
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <h2>Welcome, {session.user.name}!</h2>

      <section>
        <h3>My Points</h3>
        <p>Current Balance: 0 points</p>
      </section>

      <section>
        <h3>Recent Activity</h3>
        <p>No transactions yet.</p>
      </section>

      <section>
        <h3>Available Rewards</h3>
        <p>No rewards available yet.</p>
      </section>

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