import { getTodos } from "@/api/todo.api";
import { Todos } from "@/api/types/todo.types";
import { useQuery } from "@tanstack/react-query";

export const useTodos = () =>
  useQuery<Todos, Error>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
