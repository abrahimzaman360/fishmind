import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/helpers/auth.server";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        <div className="space-y-4">
          <Button asChild className="w-full" size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline" className="w-full" size="lg">
            <Link href="/register">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
