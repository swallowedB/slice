import { fetcher } from "@/lib/fetcher";
import { Todos, UpdateTodo } from "./types/todo";

export function getTodos() {
  return fetcher<Todos>("/todos", {
    method: "GET",
  });
}

export async function updateTodos(id: number, payload: UpdateTodo) {
  return fetcher(`/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
