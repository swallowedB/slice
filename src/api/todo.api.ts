import { fetcher } from "@/api/fetcher";
import { Todos } from "./types/todo.types";

export function getTodos() {
  return fetcher<Todos>("/todos");
}
