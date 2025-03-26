import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/helpers/auth.server";
import { ProfileCard } from "@/components/profile/profile-card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User dashboard",
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileCard user={session.user} />
        </div>
        <div className="md:col-span-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
            <p className="text-muted-foreground">
              This is your dashboard. You can manage your account and view your
              profile here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
