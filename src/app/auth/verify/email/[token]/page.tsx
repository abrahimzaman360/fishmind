import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verifyEmail } from "@/lib/helpers/auth.server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address",
};

export default async function VerifyEmailPage({
  params,
}: {
  params: { token: string };
}) {
  const { success, error } = await verifyEmail(params.token);

  if (success) {
    redirect("/login?verified=true");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Email Verification</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {error || "There was an error verifying your email address."}
          </p>
        </div>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/login">Back to Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
