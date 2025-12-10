import { fetcher } from "@/lib/fetcher";
import { GoalResponse } from "./types/goal";

export function getGoals() {
  return fetcher<GoalResponse>("/goals", {
    method: "GET",
  });
}
