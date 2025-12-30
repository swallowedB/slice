"use client";

import { useState } from "react";
import { AsyncBoundary } from "../_components/AsyncBoundary";

import TodoHeader from "./_components/TodoHeader";
import TodosContent from "./_components/TodosContent";
import TodosLayout from "./_components/TodosLayout";

import { useTodosQuery } from "@/hooks/queries/todos";

type TabType = "ALL" | "TODO" | "DONE";

/**
 * ✅ Suspense 대상 컴포넌트
 * - useTodosQuery를 여기서 호출
 * - 반드시 AsyncBoundary 안에서 렌더링됨
 */
function TodosSection({
  tab,
  onTabChange,
}: {
  tab: TabType;
  onTabChange: (tab: TabType) => void;
}) {
  const { data } = useTodosQuery();

  const todosCount = data!.totalCount;

  return (
    <>
      <TodoHeader
        tab={tab}
        onTabChange={onTabChange}
        count={todosCount}
        onAdd={() => console.log("할 일 추가")}
      />
      <TodosContent tab={tab} />
    </>
  );
}

export default function TodosPage() {
  const [tab, setTab] = useState<TabType>("ALL");

  return (
    <section className="h-screen">
      <TodosLayout>
        <AsyncBoundary loadingFallback={<div>로딩 중...</div>}>
          <TodosSection
            tab={tab}
            onTabChange={setTab}
          />
        </AsyncBoundary>
      </TodosLayout>
    </section>
  );
}
