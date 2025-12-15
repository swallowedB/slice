"use client";

import { postGoal } from "@/api/goal";
import { Goal } from "@/api/types/goal";
import goalsQueryKeys from "@/hooks/queries/goals/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type GoalsCache =
  | { nextCursor: number | null; totalCount: number; goals: Goal[] }
  | undefined;

export function useCreateGoalMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => postGoal({ title }),

    onSuccess: (created) => {
      queryClient.setQueriesData<GoalsCache>(
        { queryKey: goalsQueryKeys.lists() },
        (old) => {
          const base = old ?? { nextCursor: null, totalCount: 0, goals: [] };
          return {
            ...base,
            totalCount: base.totalCount + 1,
            goals: [created, ...base.goals],
          };
        },
      );
    },

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: goalsQueryKeys.lists() }),
  });
}
