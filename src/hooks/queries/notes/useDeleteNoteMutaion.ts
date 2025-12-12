import { deleteNote } from "@/api/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import notesQueryKeys from "./queryKeys";

interface DeleteNoteMutationVariables {
  goalId: number;
  noteId: number;
}

export function useDeleteNoteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId }: DeleteNoteMutationVariables) => deleteNote(noteId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: notesQueryKeys.list(variables.goalId),
      });
    },
  });
}
