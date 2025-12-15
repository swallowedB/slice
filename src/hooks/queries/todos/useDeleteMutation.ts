import { deleteTodos } from "@/api/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import todosQueryKeys from "./queryKeys";

export function useDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteTodos(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKeys.list() });
    },

    onError: (error) => {
      console.error("🚨 할 일 삭제 에러 🚨", error);
    },
  });
}
