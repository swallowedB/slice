import { useQuery } from "@tanstack/react-query";

export function useLatestTodos(teamId: string) {
  return useQuery({
    queryKey: ["latestTodos", teamId],
    // queryFn: () => getLatestTodos(teamId),
  });
}
