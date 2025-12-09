import { fetcher } from "@/lib/fetcher";
import { GoalResponse } from "./types/goal.types";

export function getGoals() {
  return fetcher<GoalResponse>("/goals", {
    method: "GET",
  });
}
