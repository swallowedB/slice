import { useSuspenseQuery } from "@tanstack/react-query";
import { getNotes } from "@/api/note";
import notesQueryKeys from "./queryKeys";
import { Note, Notes } from "./types";

export function useNotesQuery(goalId: number) {
  return useSuspenseQuery({
    queryKey: notesQueryKeys.list(goalId),
    queryFn: () => getNotes(goalId),
    select: (data): Notes => {
      const firstNote = data.notes[0];

      return {
        totalCount: data.totalCount,
        nextCursor: data.nextCursor,
        goal: firstNote?.goal || { id: goalId, title: "" },
        notes: data.notes.map(
          (note): Note => ({
            id: note.id,
            title: note.title,
            todo: note.todo,
            updatedAt: note.updatedAt,
          }),
        ),
      };
    },
    staleTime: 1000 * 60 * 3,
  });
}
