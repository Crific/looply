import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const session = await auth();

  // Only logged-in users can claim points
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { token } = await request.json();

  // Find the QR code
  const qrCode = await prisma.qRCode.findUnique({
    where: { token },
  });

  if (!qrCode || qrCode.expiresAt <= new Date()) {
    return Response.json(
      { error: "Invalid or expired QR code" },
      { status: 400 }
    );
  }

  // Check if the user already claimed this QR
  const existingClaim = await prisma.pointTransaction.findFirst({
    where: {
      userId: session.user.id,
      qrCodeId: qrCode.id,
    },
  });

  if (existingClaim) {
    return Response.json(
      { error: "Already claimed" },
      { status: 409 }
    );
  }

  // Save the earned points
  const transaction = await prisma.pointTransaction.create({
    data: {
      userId: session.user.id,
      qrCodeId: qrCode.id,
      pointsAmount: qrCode.pointsValue,
      type: "earn",
    },
  });

  return Response.json({
    success: true,
    pointsEarned: transaction.pointsAmount,
  });
}