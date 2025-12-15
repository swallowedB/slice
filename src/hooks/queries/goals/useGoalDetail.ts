"use client";

import { useQuery } from "@tanstack/react-query";
import { getGoalById } from "@/api/goal";
import { Goal } from "@/api/types/goal";
import goalsQueryKeys from "./queryKeys";

export function useGoalDetail(goalId: number) {
  return useQuery<Goal>({
    queryKey: goalsQueryKeys.detail(goalId),
    queryFn: () => getGoalById(goalId),
    enabled: !!goalId,
  });
}
