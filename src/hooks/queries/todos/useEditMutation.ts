import { editTodos } from "@/api/todo";
import { EditTodo } from "@/api/types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import todosQueryKeys from "./queryKeys";

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
    },

    onError: (error) => {
      console.error("🚨 에러 🚨", error);
    },
  });
}
