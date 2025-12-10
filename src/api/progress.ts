import { fetcher } from "@/lib/fetcher";
import { Progress } from "./types/progress";

export function getProgress() {
  return fetcher<Progress>("/todos/progress", {
    method: "GET",
  });
}
