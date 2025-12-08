import { useQuery } from "@tanstack/react-query";
import { getProgress } from "@/api/progress.api";

export const useProgressTodos = () => {
  useQuery<"progress", Error>({
    queryKey: ["progress"],
    // queryFn: getProgress,
  });
};
