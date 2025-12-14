"use client";

import { usePathname } from "next/navigation";

export function useActiveGoalId(): number | null {
  const pathname = usePathname();

  const match = pathname.match(/^\/goals\/(\d+)/);
  if (!match) return null;

  return Number(match[1]);
}