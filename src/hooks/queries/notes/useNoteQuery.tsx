import { useQuery } from "@tanstack/react-query";
import { getNote } from "@/api/note";
import notesQueryKeys from "./queryKeys";

export function useNoteQuery(noteId: number) {
  return useQuery({
    queryKey: notesQueryKeys.detail(noteId),
    queryFn: () => getNote(noteId),
    enabled: !!noteId && noteId > 0,
  });
}
