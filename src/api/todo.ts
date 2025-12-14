import { fetcher } from "@/lib/fetcher";
import { Todo, Todos, UpdateTodo } from "./types/todo";

export function getTodos() {
  return fetcher<Todos>("/todos", {
    method: "GET",
  });
}

export function getTodo(id: number) {
  return fetcher<Todo>(`/todos/${id}`, {
    method: "GET",
  });
}

export async function updateTodos(id: number, payload: UpdateTodo) {
  return fetcher(`/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteTodos(id: number) {
  return fetcher(`/todos/${id}`, {
    method: "DELETE",
  });
}
