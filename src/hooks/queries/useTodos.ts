import { getTodos } from "@/api/todo";
import { Todos } from "@/api/types/todo";
import { useQuery } from "@tanstack/react-query";

export const useTodos = () =>
  useQuery<Todos, Error>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
