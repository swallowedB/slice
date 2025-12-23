import { getTodos } from "@/api/todo";
import { TodoResponse, Todos } from "@/api/types/todo";

import { useSuspenseQuery } from "@tanstack/react-query";
import todosQueryKeys from "./queryKeys";

export function useTodosSuspense() {
  const { data } = useSuspenseQuery<Todos, Error, TodoResponse[]>({
    queryKey: todosQueryKeys.list(),
    queryFn: getTodos,
    select: (apiData) =>
      apiData.todos.map((apiTodo) => {
        const { done, title, ...rest } = apiTodo;
        return {
          ...rest,
          checked: done,
          label: title,
        };
      }),
  });

  return data;
}
