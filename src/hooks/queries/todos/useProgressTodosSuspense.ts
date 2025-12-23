import { useSuspenseQuery } from "@tanstack/react-query";
import { getProgress } from "@/api/progress";
import { Progress } from "@/api/types/progress";
import todosQueryKeys from "./queryKeys";

export function useProgressTodosSuspense() {
  const { data } = useSuspenseQuery<Progress, Error>({
    queryKey: todosQueryKeys.getProgress(),
    queryFn: getProgress,
    staleTime: 1000 * 60 * 5,
  });

  return data;
}
