import { LinkMetadata } from "@/api/types/note";
import { JSONContent } from "@tiptap/react";

export interface DraftNote {
  todoId: number;
  title: string;
  content: JSONContent;
  linkUrl: string | null;
  savedAt: string;
  linkMetadata?: LinkMetadata | null;
}

const DRAFT_PREFIX = "draft_note_";

export const draftNoteStorage = {
  save: (todoId: number, data: Omit<DraftNote, "todoId" | "savedAt">) => {
    const draft: DraftNote = {
      todoId,
      ...data,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(`${DRAFT_PREFIX}${todoId}`, JSON.stringify(draft));
  },

  get: (todoId: number): DraftNote | null => {
    const data = localStorage.getItem(`${DRAFT_PREFIX}${todoId}`);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  remove: (todoId: number) => {
    localStorage.removeItem(`${DRAFT_PREFIX}${todoId}`);
  },

  has: (todoId: number): boolean => {
    return localStorage.getItem(`${DRAFT_PREFIX}${todoId}`) !== null;
  },
};
