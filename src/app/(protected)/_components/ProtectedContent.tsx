"use client";

import { AuthUser } from "@/hooks/queries/auth/queryKeys";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";


export default function ProtectedContent({
  user,
  children,
}: {
  user: AuthUser;
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
}
