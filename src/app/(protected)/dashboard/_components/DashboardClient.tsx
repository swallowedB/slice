"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import DashboardHeader from "./dashboard-header/DashboardHeader";
import Todos from "./todos/Todos";
import Goal from "./goal/Goal";

export default function DashboardClient() {
  // hooks/useAuthhenticated.ts
  //  =>
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  return (
    <section>
      <DashboardHeader />
      <Todos />
      <Goal />
    </section>
  );
}
