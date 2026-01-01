import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { backendFetch } from "@/lib/backend";
import { TodosResponse } from "@/api/types/todo";
import { GoalResponse } from "@/api/types/goal";
import { Progress } from "@/api/types/progress";
import todosQueryKeys from "@/hooks/queries/todos/queryKeys";
import goalsQueryKeys from "@/hooks/queries/goals/queryKeys";
import DashboardClient from "./_components/DashboardClient";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: todosQueryKeys.all,
      queryFn: () =>
        backendFetch<TodosResponse>("/todos", {
          auth: "access",
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: todosQueryKeys.getProgress(),
      queryFn: () =>
        backendFetch<Progress>("/todos/progress", {
          auth: "access",
        }),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: goalsQueryKeys.infinite(),
      queryFn: () =>
        backendFetch<GoalResponse>("/goals?size=2", {
          auth: "access",
        }),
      initialPageParam: undefined,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  );
}
