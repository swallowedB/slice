import { deleteTodos } from "@/api/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import todosQueryKeys from "./queryKeys";

//delete는 body가 없으므로 payload가 필요없음! 단순 id만 필요함.
export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteTodos(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKeys.list() });
    },

    onError: (error) => {
      console.error("🚨 에러 🚨", error);
    },
  });
};
