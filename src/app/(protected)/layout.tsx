import { ReactNode } from "react";
import NavigationDesktop from "./_components/navigation/Navigation.Desktop";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen gap-28 overflow-hidden">
      <div className="hidden sm:block">
        <NavigationDesktop />
      </div>
      <section className="flex-1 overflow-y-auto py-12 lg:py-20 lg:pr-40">
        {children}
      </section>
    </main>
  );
}
