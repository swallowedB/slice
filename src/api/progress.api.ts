import { fetcher } from "@/api/fetcher";
import { ProgressProps } from "@/components/progress/Progress.types";

export function getProgress() {
  return fetcher<ProgressProps>("/todos/progress");
}
