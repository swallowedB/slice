import { createNote } from "@/api/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import notesQueryKeys from "./queryKeys";

export function useCreateNoteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: notesQueryKeys.list(data.goal.id),
      });
    },
  });
}
