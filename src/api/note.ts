import { fetcher } from "@/lib/fetcher";
import { NotesResponse } from "./types/note";

export function getNotes() {
  return fetcher<NotesResponse>("/notes", {
    method: "GET",
  });
}
