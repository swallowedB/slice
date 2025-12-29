import { editTodos } from "@/api/todo";
import { EditTodo } from "@/api/types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import todosQueryKeys from "./queryKeys";
import { toast } from "@/lib/toast";

interface EditTodoVariables {
  todoId: number;
  payload: EditTodo;
}

export function useEditMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, payload }: EditTodoVariables) =>
      editTodos(todoId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: todosQueryKeys.edit(variables.todoId),
      });
      queryClient.invalidateQueries({
        queryKey: todosQueryKeys.list(),
      });
      toast.success("할 일이 수정되었습니다.");
    },

    onError: () => {
      toast.error("할 일 수정에 실패했습니다.");
    },
  });
}
