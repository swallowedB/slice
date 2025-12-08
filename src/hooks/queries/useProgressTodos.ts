import { useQuery } from "@tanstack/react-query";
import { getProgress } from "@/api/progress.api";
import { Progress } from "@/api/types/progress.types";

export const useProgressTodos = () => {
  return useQuery<Progress, Error>({
    queryKey: ["progress"],
    queryFn: getProgress,
  });
};
