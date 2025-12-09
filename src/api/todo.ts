import { fetcher } from "@/lib/fetcher";
import { Todos } from "./types/todo";

export function getTodos() {
  return fetcher<Todos>("/todos", {
    method: "GET",
  });
}
