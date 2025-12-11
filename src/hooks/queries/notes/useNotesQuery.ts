import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/api/note";
import notesQueryKeys from "./queryKeys";

export function useNotesQuery(goalId: number) {
  return useQuery({
    queryKey: notesQueryKeys.list(goalId),
    queryFn: () => getNotes(goalId),
    enabled: !!goalId,
    staleTime: 1000 * 60 * 3,
  });
}
