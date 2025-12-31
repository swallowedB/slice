"use client";

import { usePathname } from "next/navigation";

export function useNavActive() {
  const pathname = usePathname();

  const isDashboardActive = pathname === "/dashboard";
  const isGoalsSectionActive = pathname.startsWith("/goals");

  const match = pathname.match(/^\/goals\/(\d+)(?:\/)?$/);
  const activeGoalId = match ? Number(match[1]) : null;

  return {
    pathname,
    isDashboardActive,
    isGoalsSectionActive,
    activeGoalId,
  };
}
