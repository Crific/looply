import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function POST() {
  // Generate a unique QR token
  const token = randomUUID();

  // Set QR expiration to 30 seconds
  const expiresAt = new Date(Date.now() + 30000);

  // Save the new QR code in PostgreSQL
  const qrCode = await prisma.qRCode.create({
    data: {
      token,
      pointsValue: 10,
      expiresAt,
    },
  });

  return Response.json(
    {
      token: qrCode.token,
      pointsValue: qrCode.pointsValue,
      expiresAt: qrCode.expiresAt,
    },
    { status: 201 }
  );
}