"use client";

import { useEffect, ReactNode } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthUser } from "@/hooks/queries/auth/queryKeys";

interface ProtectedContentProps {
  children: ReactNode;
  user: AuthUser;
}

export default function ProtectedContent({
  children,
  user,
}: ProtectedContentProps) {
  const { setUser, setHydrated } = useAuthStore();

  useEffect(() => {
    setUser(user);
    setHydrated(true);
  }, [user, setUser, setHydrated]);

  return <>{children}</>;
}
