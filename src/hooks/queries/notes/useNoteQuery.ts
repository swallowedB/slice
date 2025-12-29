import { useSuspenseQuery } from "@tanstack/react-query";
import { getNote } from "@/api/note";
import { JSONContent } from "@tiptap/react";
import notesQueryKeys from "./queryKeys";

export function useNoteQuery(noteId: number) {
  return useSuspenseQuery({
    queryKey: notesQueryKeys.detail(noteId),
    queryFn: () => getNote(noteId),
    staleTime: 1000 * 60 * 3,
    select: (data) => ({
      ...data,
      content: JSON.parse(data.content) as JSONContent,
    }),
  });
}
