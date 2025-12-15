import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateTodo } from "@/api/types/todo";
import { createTodos } from "@/api/todo";

import todosQueryKeys from "./queryKeys";

export function useCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTodo) => createTodos(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKeys.list() });
    },

    onError: (error) => {
      console.error("🚨 할 일 생성 에러 🚨", error);
    },
  });
}
