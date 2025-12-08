import { fetcher } from "@/api/fetcher";
import { Todos } from "@/app/(protected)/_types";

export function getTodos() {
  return fetcher<Todos>("/todos");
}
