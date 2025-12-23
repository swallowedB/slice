export interface Todos {
  totalCount: number;
  nextCursor: number;
  todos: Todo[];
}
export interface TodoResponse {
  noteId: number;
  checked: boolean;
  linkUrl: string;
  fileUrl: string;
  label: string;
  id: number;
  goal: {
    id: number;
    title: string;
  };
  userId: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
}
export interface Todo {
  noteId: number;
  done: boolean;
  linkUrl: string;
  fileUrl: string;
  title: string;
  id: number;
  goal: {
    id: number;
    title: string;
  };
  userId: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
}

export interface UpdateTodo {
  id?: number;
  done?: boolean;
}

export interface CreateTodo {
  title: string;
  linkUrl?: string;
  fileUrl?: string;
  goalId: number;
}

export interface EditTodo {
  title: string;
  fileUrl?: string;
  linkUrl?: string;
  goalId: number;
  done: boolean;
}

export interface DeleteTodo {
  id: number;
}
