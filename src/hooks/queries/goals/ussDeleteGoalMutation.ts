import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteGoal } from "@/api/goal";
import goalsQueryKeys from "./queryKeys";
export function useDeleteMutation(goalId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goalId }: { goalId: number }) => deleteGoal(goalId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalsQueryKeys.lists() });
    },
    onError: (error) => {
      console.error("목표 삭제 에러", error);
    },
  });
}
