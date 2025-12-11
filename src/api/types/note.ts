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
