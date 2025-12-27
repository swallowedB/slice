import { fetcher } from "@/lib/fetcher";
import { Goal, GoalResponse, UpdateGoal } from "./types/goal";
import { buildQuery } from "@/lib/buildQuery";

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

export async function postGoal(payload: { title: string }): Promise<Goal> {
  return fetcher<Goal>(`/goals`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteGoal(goalId: number) {
  return fetcher(`/goals/${goalId}`, {
    method: "DELETE",
  });
}

export async function cursorGoals(params: { cursor?: number; size?: number }) {
  const query = buildQuery({
    cursor: params.cursor,
    size: params.size ?? 2,
  });

  const url = query ? `/goals?${query}` : `/goals`;

  return fetcher<GoalResponse>(url, {
    method: "GET",
  });
}
