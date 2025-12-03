import { ReactNode } from "react";
import NavigationDesktop from "./_components/navigation/Navigation.Desktop";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen overflow-hidden sm:h-screen sm:gap-12 lg:gap-20">
      <div className="hidden sm:block">
        <NavigationDesktop />
      </div>

      <section className="flex-1 overflow-y-auto px-5 pt-22 pb-12 sm:pt-12 lg:py-20 lg:pr-40">
        {children}
      </section>
    </main>
  );
}
