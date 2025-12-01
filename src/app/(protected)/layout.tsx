"use client";
import { ReactNode } from "react";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import NavigationDesktop from "./_components/navigation/Navigation.Desktop";
import PageHeader from "./_components/layout/PageHeader";

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
    <main className="flex min-h-screen gap-28">
      <NavigationDesktop />
      <section className="flex-1 sm:py-12 lg:py-20 lg:pr-40">
        {children}
      </section>
    </main>
  );
}
