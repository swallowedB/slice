import { useQuery } from "@tanstack/react-query";
import { getProgress } from "@/api/progress";
import { Progress } from "@/api/types/progress";

export const useProgressTodos = () => {
  return useQuery<Progress, Error>({
    queryKey: ["progress"],
    queryFn: getProgress,
  });
};
