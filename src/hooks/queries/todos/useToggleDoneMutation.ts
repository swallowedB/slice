import { updateTodos } from "@/api/todo";
import { UpdateTodo } from "@/api/types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import todosQueryKeys from "./queryKeys";

export function useToggleDoneMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateTodo }) =>
      updateTodos(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKeys.list() });
    },
  });
}
