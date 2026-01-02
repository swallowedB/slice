import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { backendFetch } from "@/lib/backend";
import { TodosResponse } from "@/api/types/todo";
import { GoalResponse } from "@/api/types/goal";
import todosQueryKeys from "@/hooks/queries/todos/queryKeys";
import goalsQueryKeys from "@/hooks/queries/goals/queryKeys";
import { AsyncBoundary } from "../../_components/AsyncBoundary";
import GoalContainer from "./_components/GoalContainer";
import GoalContainerSkeleton from "./_components/GoalContainerSkeleton";

interface GoalsPageProps {
  params: Promise<{ goalId: string }>;
}

export default async function GoalsPage({ params }: GoalsPageProps) {
  const { goalId } = await params;

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
      queryKey: goalsQueryKeys.detail(Number(goalId)),
      queryFn: async () => {
        try {
          return await backendFetch<GoalResponse>(`/goals/${goalId}`, {
            auth: "access",
          });
        } catch (error) {
          console.warn(`Goal ${goalId} not found, skipping prefetch`);
          return null;
        }
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AsyncBoundary loadingFallback={<GoalContainerSkeleton />}>
        <GoalContainer goalId={goalId} />
      </AsyncBoundary>
    </HydrationBoundary>
  );
}
