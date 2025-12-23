import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { Todos } from "@/api/types/todo";
import { cursorTodos } from "@/api/todo";
import todosQueryKeys from "./queryKeys";

export function useInfiniteTodos(goalId?: number) {
  return useInfiniteQuery<
    Todos,
    Error,
    InfiniteData<Todos>,
    ReturnType<typeof todosQueryKeys.listByGoal>,
    number | undefined
  >({
    queryKey: todosQueryKeys.listByGoal(goalId),

    initialPageParam: undefined,

    queryFn: ({ pageParam }) =>
      cursorTodos({
        goalId,
        cursor: pageParam,
        size: 40,
      }),

    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
