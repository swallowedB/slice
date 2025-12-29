import { deleteTodos } from "@/api/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import todosQueryKeys from "./queryKeys";
import { toast } from "@/lib/toast";

export function useDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteTodos(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKeys.list() });
      toast.success("할 일이 삭제되었습니다.");
    },

    onError: () => {
      toast.error("할 일 삭제에 실패했습니다.");
    },
  });
}
