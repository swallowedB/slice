"use client";

import { useState, useEffect } from "react";
import { AsyncBoundary } from "../_components/AsyncBoundary";

import TodoHeader from "./_components/TodoHeader";
import TodosContent from "./_components/TodosContent";
import TodosLayout from "./_components/TodosLayout";

import { useTodosQuery } from "@/hooks/queries/todos";

type TabType = "ALL" | "TODO" | "DONE";

function TodosSection({
  tab,
  onTabChange,
}: {
  tab: TabType;
  onTabChange: (tab: TabType) => void;
}) {
  const { data } = useTodosQuery();

  const todosCount = data?.totalCount ?? 0;

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

  // 바깥 스크롤 제거
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
