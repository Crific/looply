import { auth } from "@/auth";

export async function GET() {
  // Check if the user is authenticated
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Temporary dashboard data
  return Response.json({
    user: {
      id: session.user.id,
      name: session.user.name,
    },
    points: 0,
    recentActivity: [],
    rewards: [],
  });
}