import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <main className="md:py-12 lg:py-20">{children}</main>;
}
