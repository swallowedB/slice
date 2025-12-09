import { useQuery } from "@tanstack/react-query";
import { getProgress } from "@/api/progress";
import { Progress } from "@/api/types/progress";
import todosQueryKeys from "./queryKeys";

export const useProgressTodos = () => {
  return useQuery<Progress, Error>({
    queryKey: todosQueryKeys.getProgress(),
    queryFn: getProgress,
    // enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
