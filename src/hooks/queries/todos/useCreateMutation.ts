import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateTodo } from "@/api/types/todo";
import { createTodos } from "@/api/todo";
import { toast } from "@/lib/toast";

import todosQueryKeys from "./queryKeys";

export function useCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTodo) => createTodos(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKeys.list() });
      toast.success("할 일을 생성했습니다.");
    },

    onError: () => {
      toast.error("할 일 생성에 실패했습니다.");
    },
  });
}
