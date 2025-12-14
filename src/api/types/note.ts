export interface NoteResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  teamId: string;
  goal: {
    id: number;
    title: string;
  };
  todo: {
    id: number;
    title: string;
    done: boolean;
  };
}

export interface NotesResponse {
  notes: NoteResponse[];
  totalCount: number;
  nextCursor: number | null;
}

export interface CreateNoteRequest {
  todoId: number;
  title: string;
  content: string;
  linkUrl?: string;
}

export type UpdateNoteRequest = Omit<CreateNoteRequest, "todoId">;

export interface NoteDetailResponse {
  id: number;
  title: string;
  content: string;
  linkUrl: string | null;
  createdAt: string;
  updatedAt: string;
  teamId: string;
  userId: number;
  goal: {
    id: number;
    title: string;
  };
  todo: {
    id: number;
    title: string;
    fileUrl: string | null;
    linkUrl: string | null;
    done: boolean;
  };
}
