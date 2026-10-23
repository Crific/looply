import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request) {
  // Read login information from the frontend
  const body = await request.json();

  const { email, password } = body;

  // Make sure both fields were entered
  if (!email || !password) {
    return Response.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  // Find the user using their email
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  // User does not exist
  if (!user) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  // Compare entered password with the stored password hash
  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  // Login information is correct
  return Response.json(
    {
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
    { status: 200 }
  );
}