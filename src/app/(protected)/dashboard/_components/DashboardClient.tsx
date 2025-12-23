"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import DashboardHeader from "./dashboard-header/DashboardHeader";
import Todos from "./todos/Todos";
import Goal from "./goal/Goal";

export default function DashboardClient() {
  const router = useRouter();
  const hydrated = useAuthStore((s) => s.hydrated);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!hydrated) return; // ⭐ 핵심

    if (!user) {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  if (!hydrated) return null; // 로딩 중

  return (
    <section>
      <DashboardHeader />
      <Todos />
      <Goal />
    </section>
  );
}
