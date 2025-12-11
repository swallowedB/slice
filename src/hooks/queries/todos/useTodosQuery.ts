import { getTodos } from "@/api/todo";
import { Todos } from "@/api/types/todo";
import { useQuery } from "@tanstack/react-query";
import todosQueryKeys from "./queryKeys";

export function useTodosQuery() {
  return useQuery<Todos, Error>({
    queryKey: todosQueryKeys.list(),
    queryFn: getTodos,
    // enabled: !!userId,
  });
}
