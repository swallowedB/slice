import { useMutation } from "@tanstack/react-query";
import { fileUploadsTodos } from "@/api/file";

interface FileUploadResponse {
  url: string;
}

export function useFileUploadMutation() {
  return useMutation<FileUploadResponse, Error, File>({
    mutationFn: fileUploadsTodos,

    onError: (error) => {
      console.error("🚨 파일 업로드 실패", error);
    },
  });
}
