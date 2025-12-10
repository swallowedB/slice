import { getTodos } from "@/api/todo";
import { Todos } from "@/api/types/todo";
import { useQuery } from "@tanstack/react-query";
import todosQueryKeys from "./queryKeys";

export const useTodosQuery = () =>
  useQuery<Todos, Error>({
    queryKey: todosQueryKeys.list(),
    queryFn: getTodos,
    // enabled: !!userId,
  });
