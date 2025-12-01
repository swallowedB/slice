import { ReactNode } from "react";
import Navigation from "./_components/navigation/Navigation";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex gap-28 ">
      <Navigation />
      <section className="sm:py-12 lg:py-20">{children}</section>
    </main>
  );
}
