import { getGoals } from "@/api/goal";
import { GoalResponse } from "@/api/types/goal";
import { useSuspenseQuery } from "@tanstack/react-query";
import goalsQueryKeys from "./queryKeys";

export function useGoalListSuspense() {
  return useSuspenseQuery<GoalResponse>({
    queryKey: goalsQueryKeys.list(),
    queryFn: getGoals,
    staleTime: 1000 * 60 * 5,
  });
}
