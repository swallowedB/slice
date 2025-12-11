import { fetcher } from "@/lib/fetcher";
import { NotesResponse } from "./types/note";

export function getNotes(goalId: number) {
  return fetcher<NotesResponse>(`/notes?goalId=${goalId}`, {
    method: "GET",
  });
}
