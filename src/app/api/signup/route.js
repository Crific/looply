
// Sign-up logic: user sends name, email, and password
// POST
// Validates and creates user in database
// success or error message


import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";


export async function POST(request) {
  // Read signup data sent from the frontend
  const body = await request.json();

  const { name, email, password, confirm } = body;

  // Validate required fields
  if (!name || !email || !password || !confirm) {
    return Response.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  // Make sure both password fields match
  if (password !== confirm) {
    return Response.json(
      { error: "Passwords do not match" },
      { status: 400 }
    );
  }

  // Prevent duplicate accounts using the same email
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return Response.json(
      { error: "Email already exists" },
      { status: 409 }
    );
  }

  // Hash the password before storing it in the database
  const passwordHash = await bcrypt.hash(password, 12);

  // Create the new user through Prisma
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      passwordHash: passwordHash,
    },
  });

  // Return safe user information without exposing the password hash
  return Response.json(
    {
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
    { status: 201 }
  );
}