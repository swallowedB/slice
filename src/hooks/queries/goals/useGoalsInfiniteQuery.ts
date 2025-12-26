// hooks/queries/goals/useGoalsInfiniteQuery.ts
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import goalsQueryKeys from "./queryKeys";
import { cursorGoals } from "@/api/goal";
import { GoalResponse } from "@/api/types/goal";

export const useGoalsInfiniteQuery = () => {
  return useSuspenseInfiniteQuery({
    queryKey: goalsQueryKeys.infinite(),
    initialPageParam: undefined,

    queryFn: ({ pageParam }) =>
      cursorGoals({
        cursor: pageParam,
        size: 2,
      }),
    getNextPageParam: (lastPage: GoalResponse) => lastPage.nextCursor,
  });
};
