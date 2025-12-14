import { useQuery } from "@tanstack/react-query";
import { getTodo } from "@/api/todo";
import todosQueryKeys from "./queryKeys";

export function useTodoQuery(todoId: number) {
  return useQuery({
    queryKey: todosQueryKeys.detail(todoId),
    queryFn: () => getTodo(todoId),
    enabled: !!todoId && todoId > 0,
  });
}
