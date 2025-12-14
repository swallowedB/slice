import { fetcher } from "@/lib/fetcher";
import {
  NotesResponse,
  NoteDetailResponse,
  CreateNoteRequest,
  UpdateNoteRequest,
} from "./types/note";

export function getNotes(goalId: number) {
  return fetcher<NotesResponse>(`/notes?goalId=${goalId}`, {
    method: "GET",
  });
}

export function getNote(noteId: number) {
  return fetcher<NoteDetailResponse>(`/notes/${noteId}`, {
    method: "GET",
  });
}

export function createNote(data: CreateNoteRequest) {
  return fetcher<NoteDetailResponse>("/notes", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateNote(noteId: number, data: UpdateNoteRequest) {
  return fetcher<NoteDetailResponse>(`/notes/${noteId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteNote(noteId: number) {
  return fetcher(`/notes/${noteId}`, {
    method: "DELETE",
  });
}
