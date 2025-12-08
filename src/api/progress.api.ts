import { fetcher } from "@/api/fetcher";
import { Progress } from "./types/progress.types";

export function getProgress() {
  return fetcher<Progress>("/todos/progress");
}
