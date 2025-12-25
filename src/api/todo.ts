import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/buildQuery";
import {
  Todos,
  UpdateTodo,
  CreateTodo,
  EditTodo,
  CursorTodoParams,
  TodosResponse,
  TodoResponse,
} from "./types/todo";

export function getTodos() {
  return fetcher<TodosResponse>("/todos", {
    method: "GET",
  });
}

export function getTodo(id: number) {
  return fetcher<TodoResponse>(`/todos/${id}`, {
    method: "GET",
  });
}

export async function updateTodos(id: number, payload: UpdateTodo) {
  return fetcher(`/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function createTodos(payload: CreateTodo) {
  return fetcher("/todos", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function editTodos(todoId: number, payload: EditTodo) {
  return fetcher(`/todos/${todoId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteTodos(id: number) {
  return fetcher(`/todos/${id}`, {
    method: "DELETE",
  });
}

export async function cursorTodos(params: CursorTodoParams) {
  const query = buildQuery({
    goalId: params.goalId,
    cursor: params.cursor,
    size: params.size ?? 40,
  });
  const url = query ? `/todos?${query}` : `/todos`;

  return fetcher<Todos>(url, {
    method: "GET",
  });
}
