export interface GoalResponse {
  nextCursor: number;
  totalCount: number;
  goals: Goal[];
}

export interface Goal {
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  userId: number;
  teamId: number;
}
