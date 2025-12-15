import { updateNote } from "@/api/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateNoteRequest } from "@/api/types/note";
import notesQueryKeys from "./queryKeys";

interface UpdateNoteMutationVariables {
  noteId: number;
  data: UpdateNoteRequest;
}

export function useUpdateNoteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, data }: UpdateNoteMutationVariables) =>
      updateNote(noteId, data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: notesQueryKeys.list(data.goal.id),
      });

      queryClient.removeQueries({
        queryKey: notesQueryKeys.detail(data.id),
      });
    },
  });
}
