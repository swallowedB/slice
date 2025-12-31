"use client";

import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import { useAuthStore } from "@/store/useAuthStore";
import { AsyncBoundary } from "@/app/(protected)/_components/AsyncBoundary";
import GoalContainerSkeleton from "./GoalContainerSkeleton";
import GoalContainerData from "./GoalContainerData";

type Props = {
  goalId: string;
};

export default function GoalContainer({ goalId }: Props) {
  const nickname = useAuthStore((state) => state.user?.name ?? "");

  return (
    <section>
      <PageHeader
        title={`${nickname} 목표`}
        desktopClassName="sm:mb-8.5"
      />

      <AsyncBoundary loadingFallback={<GoalContainerSkeleton />}>
        <GoalContainerData goalId={goalId} />
      </AsyncBoundary>
    </section>
  );
}
