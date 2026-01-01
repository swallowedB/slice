import { useSuspenseQuery } from "@tanstack/react-query";
import { getTodo } from "@/api/todo";
import todosQueryKeys from "./queryKeys";

export function useTodoQuery(todoId: number) {
  return useSuspenseQuery({
    queryKey: todosQueryKeys.detail(todoId),
    queryFn: () => getTodo(todoId),
  });
}
