import { fetcher } from "@/lib/fetcher";
import { Goal, GoalResponse, UpdateGoal } from "./types/goal";

export function getGoals() {
  return fetcher<GoalResponse>("/goals", {
    method: "GET",
  });
}

export async function getGoalById(goalId: number) {
  return fetcher<Goal>(`/goals/${goalId}`, {
    method: "GET",
  });
}

export async function updateGoal(
  goalId: number,
  payload: UpdateGoal,
): Promise<Goal> {
  return fetcher<Goal>(`/goals/${goalId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteGoal(goalId: number) {
  return fetcher(`/goals/${goalId}`, {
    method: "DELETE",
  });
}
