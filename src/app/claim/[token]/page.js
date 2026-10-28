
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ClaimClient from "./ClaimClient.js";

export default async function ClaimPage({ params }) {
  const { token } = await params;
  const session = await auth();

  // Redirect guests to login while keeping the claim URL
  if (!session?.user?.id) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(`/claim/${token}`)}`
    );
  }

  return <ClaimClient token={token} />;
}