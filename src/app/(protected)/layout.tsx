import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <main className="sm:py-12 lg:py-20">{children}</main>;
}
