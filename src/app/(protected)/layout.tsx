import { redirect } from "next/navigation";
import NavigationDesktop from "./_components/navigation/NavigationDesktop";
import ProtectedContent from "./_components/ProtectedContent";
import { backendFetch } from "@/lib/backend";
import { AuthUser } from "@/hooks/queries/auth/queryKeys";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
  modal,
}: ProtectedLayoutProps) {
  let user: AuthUser;

  try {
    user = await backendFetch<AuthUser>("/user", { auth: "access" });
  } catch {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen overflow-hidden sm:h-screen sm:gap-12 lg:gap-20">
      <div className="hidden sm:block">
        <NavigationDesktop />
      </div>

      <section className="flex-1 overflow-y-auto px-5 pt-22 pb-12 sm:pt-12 lg:py-20 lg:pr-40">
        <ProtectedContent user={user}>
          {children}
          {modal}
        </ProtectedContent>
      </section>
    </main>
  );
}
