"use client";
import { ReactNode } from "react";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import NavigationDesktop from "./_components/navigation/Navigation.Desktop";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { isMobile } = useDeviceSize();

  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col pt-15">
        <section className="flex-1 px-4 py-4">{children}</section>
      </div>
    );
  }

  return (
    <main className="flex h-screen gap-28 overflow-hidden">
      <NavigationDesktop />

      <section className="flex-1 overflow-y-auto py-12 lg:py-20 lg:pr-40">
        {children}
      </section>
    </main>
  );
}
