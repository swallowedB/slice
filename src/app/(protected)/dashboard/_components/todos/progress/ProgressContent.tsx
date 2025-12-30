"use client";
import Progress from "@/components/progress/Progress";
import { useProgressTodosSuspense } from "@/hooks/queries/todos/useProgressTodosSuspense";

type ProgressContentProps = {
  nickname: string;
};

export default function ProgressContent({ nickname }: ProgressContentProps) {
  const data = useProgressTodosSuspense();

  return (
    <Progress
      percent={data.progress ?? 0}
      variant="large"
      title={`${nickname}님의 진행도는`}
    />
  );
}
