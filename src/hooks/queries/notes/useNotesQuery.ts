import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/api/note";
import notesQueryKeys from "./queryKeys";
import { Note, Notes } from "./types";

export function useNotesQuery(goalId: number) {
  return useQuery({
    queryKey: notesQueryKeys.list(goalId),
    queryFn: () => getNotes(goalId),
    select: (data): Notes => ({
      totalCount: data.totalCount,
      nextCursor: data.nextCursor,
      notes: data.notes.map(
        (note): Note => ({
          id: note.id,
          title: note.title,
          todo: note.todo,
          updatedAt: note.updatedAt,
        }),
      ),
    }),
    enabled: !!goalId,
    staleTime: 1000 * 60 * 3,
  });
}
