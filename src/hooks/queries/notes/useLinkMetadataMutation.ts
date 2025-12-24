import { getLinkMetadata } from "@/api/note";
import { useMutation } from "@tanstack/react-query";

export function useLinkMetadataMutation() {
  return useMutation({
    mutationFn: (url: string) => getLinkMetadata(url),
  });
}
