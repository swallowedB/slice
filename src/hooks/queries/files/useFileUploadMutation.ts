import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileUploadsTodos } from "@/api/file";
import filesQueryKeys from "./queryKeys";

interface FileUploadResponse {
  fileUrl: string;
}

export function useFileUploadMutation() {
  const queryClient = useQueryClient();

  return useMutation<FileUploadResponse, Error, File>({
    mutationFn: (file: File) => fileUploadsTodos(file),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: filesQueryKeys.upload() });
    },

    onError: (error) => {
      console.error("🚨 파일 업로드 실패", error);
    },
  });
}
