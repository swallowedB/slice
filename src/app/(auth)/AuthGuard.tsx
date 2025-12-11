"use client"

import { useAuthStore } from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const PUBLIC_PATHS = ["/login", "/signup"];

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, hydrated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;

    const isPublic = PUBLIC_PATHS.includes(pathname);

    if (!user && !isPublic) {
      router.replace("/login");
      return;
    }

    if (user && isPublic) {
      router.replace("/");
      return;
    }
  }, [hydrated, user, pathname, router]);

  return <>{children}</>;
}