export interface TodosResponse {
  totalCount: number;
  nextCursor: number | null;
  todos: TodoResponse[];
}

export interface TodoResponse {
  id: number;
  noteId: number;
  done: boolean;
  title: string;
  linkUrl: string;
  linkMetadata?: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  fileUrl: string;
  goal: {
    id: number;
    title: string;
  };
  userId: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
}

export interface Todos {
  totalCount: number;
  nextCursor: number | null;
  todos: Todo[];
}

export interface Todo {
  id: number;
  noteId: number;
  done: boolean;
  title: string;
  linkUrl: string;
  fileUrl: string;
  goal: {
    id: number;
    title: string;
  };
  updatedAt: string;
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

export interface CursorTodoParams {
  goalId?: number;
  cursor?: number;
  size?: number;
}
