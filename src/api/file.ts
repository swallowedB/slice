import { fetcher } from "@/lib/fetcher";
import { FileUploadTodo } from "./types/file";

export async function fileUploadsTodos(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  return fetcher<FileUploadTodo>("/files", {
    method: "POST",
    body: formData,
  });
}
