export interface Note {
  id: number;
  title: string;
  todo: {
    id: number;
    title: string;
    done: boolean;
  };
  updatedAt: string;
}

export interface Notes {
  totalCount: number;
  nextCursor: number | null;
  notes: Note[];
}
