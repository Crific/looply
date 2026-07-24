
// Sign-up logic: user sends name, email, and password
// POST
// Validates and creates user in database
// success or error message

export async function POST(request) {
  console.log("POST /api/signup reached");

  const body = await request.json();

  console.log("Received body:", body);

  return Response.json({
    message: "Request received",
  });
}