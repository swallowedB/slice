import { ReactNode } from "react";
import { redirect } from "next/navigation";
import NavigationDesktop from "./_components/navigation/NavigationDesktop";
import { backendFetch } from "@/lib/backend";

type MeResponse = { id: string; name: string; email: string };

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  try {
    await backendFetch<MeResponse>("/user", { auth: "access" });
  } catch {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen overflow-hidden sm:h-screen sm:gap-12 lg:gap-20">
      <div className="hidden sm:block">
        <NavigationDesktop />
      </div>

      <section className="flex-1 overflow-y-auto px-5 pt-22 pb-12 sm:pt-12 lg:py-20 lg:pr-40">
        {children}
        {modal}
      </section>
    </main>
  );
}
