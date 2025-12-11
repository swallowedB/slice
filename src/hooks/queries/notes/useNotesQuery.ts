import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/api/note";
import notesQueryKeys from "./queryKeys";

export function useNotesQuery() {
  return useQuery({
    queryKey: notesQueryKeys.list(),
    queryFn: getNotes,
    staleTime: 1000 * 60 * 3,
  });
}
