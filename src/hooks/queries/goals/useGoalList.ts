import { getGoals } from "@/api/goal";
import { GoalResponse } from "@/api/types/goal";
import { useQuery } from "@tanstack/react-query";
import goalsQueryKeys from "./queryKeys";

export function useGoalList() {
  // userId: string
  return useQuery<GoalResponse>({
    queryKey: goalsQueryKeys.all,
    queryFn: getGoals,
    //enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
