"use client";

import Progress from "@/components/progress/Progress";

type GoalProgressCardProps = {
  percent: number;
};

export default function GoalProgressCard({ percent }: GoalProgressCardProps) {
  return (
    <div className="bg-orange-250 rounded-4xl px-8 py-8.5 sm:px-0 lg:h-31.25 lg:py-4 xl:h-auto xl:py-8.5">
      <div className="flex h-full items-center justify-center gap-7.5">
        <Progress
          percent={percent}
          variant="default"
          title="목표 진행도"
        />
      </div>
    </div>
  );
}
