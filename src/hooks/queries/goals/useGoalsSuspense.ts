import { useSuspenseQuery } from "@tanstack/react-query";
import goalsQueryKeys from "./queryKeys";
import { getGoals } from "@/api/goal";
import { GoalResponse } from "@/api/types/goal";

export function useGoalsSuspense() {
  const { data } = useSuspenseQuery<GoalResponse>({
    queryKey: goalsQueryKeys.all,
    queryFn: getGoals,
  });

  return data;
}
