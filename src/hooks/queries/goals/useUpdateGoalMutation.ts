"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGoal } from "@/api/goal";
import goalsQueryKeys from "./queryKeys";
import { Goal, UpdateGoal } from "@/api/types/goal";

export function useUpdateGoalMutation(goalId: number) {
  const queryClient = useQueryClient();

  return useMutation<Goal, Error, UpdateGoal>({
    mutationFn: (payload) => updateGoal(goalId, payload),

    onSuccess: (data) => {
      queryClient.setQueryData(goalsQueryKeys.detail(goalId), data);

      queryClient.invalidateQueries({ queryKey: goalsQueryKeys.list() });
      queryClient.invalidateQueries({
        queryKey: goalsQueryKeys.detail(goalId),
      });
    },

    onError: (err) => {
      console.error("목표 수정 실패:", err);
    },
  });
}
