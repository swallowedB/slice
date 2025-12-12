import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteGoal } from "@/api/goal";
import goalsQueryKeys from "./queryKeys";
export function useDeleteGoalMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goalId: number) => deleteGoal(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: goalsQueryKeys.all,
      });
    },
  });
}
