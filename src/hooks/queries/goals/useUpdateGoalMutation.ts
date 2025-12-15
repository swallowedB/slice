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
      // 상세 데이터 즉시 반영
      queryClient.setQueryData(goalsQueryKeys.detail(goalId), data);

      // 목록도 최신화
      queryClient.invalidateQueries({
        queryKey: goalsQueryKeys.detail(goalId),
      });
    },

    onError: (err) => {
      console.error("목표 수정 실패:", err);
    },
  });
}
