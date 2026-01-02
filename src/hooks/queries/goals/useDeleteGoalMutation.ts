import {
  useMutation,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";
import { deleteGoal } from "@/api/goal";
import goalsQueryKeys from "./queryKeys";
import { useRouter } from "next/navigation";
import { Goal, GoalResponse } from "@/api/types/goal";

type GoalsCache =
  | { nextCursor: number | null; totalCount: number; goals: Goal[] }
  | undefined;

export function useDeleteGoalMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (goalId: number) => deleteGoal(goalId),

    onMutate: async (goalId) => {
      await queryClient.cancelQueries({
        queryKey: goalsQueryKeys.detail(goalId),
      });
      await queryClient.cancelQueries({
        queryKey: goalsQueryKeys.list(),
      });
      await queryClient.cancelQueries({
        queryKey: goalsQueryKeys.infinite(),
      });

      queryClient.setQueriesData<GoalsCache>(
        { queryKey: goalsQueryKeys.list() },
        (old) => {
          if (!old?.goals) return old;
          return {
            ...old,
            totalCount: old.totalCount - 1,
            goals: old.goals.filter((goal) => goal.id !== goalId),
          };
        },
      );

      queryClient.setQueriesData<InfiniteData<GoalResponse>>(
        { queryKey: goalsQueryKeys.infinite() },
        (old) => {
          if (!old?.pages) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              totalCount: page.totalCount - 1,
              goals: page.goals.filter((goal) => goal.id !== goalId),
            })),
          };
        },
      );

      queryClient.removeQueries({
        queryKey: goalsQueryKeys.detail(goalId),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: goalsQueryKeys.list(),
      });
      queryClient.invalidateQueries({
        queryKey: goalsQueryKeys.infinite(),
      });

      router.replace("/dashboard");
    },

    onError: () => {
      queryClient.invalidateQueries({
        queryKey: goalsQueryKeys.list(),
      });
      queryClient.invalidateQueries({
        queryKey: goalsQueryKeys.infinite(),
      });
    },
  });
}
