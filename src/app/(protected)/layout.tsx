import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <main className="md:py-20 lg:py-12">{children}</main>;
}
