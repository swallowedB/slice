"use client";

import { useState, Suspense } from "react";
import TodoHeader from "./_components/TodoHeader";
import TodosContent from "./_components/TodosContent";
import TodosLayout from "./_components/TodosLayout";

import { useTodosQuery } from "@/hooks/queries/todos";

export default function TodosPage() {
  const [tab, setTab] = useState<"ALL" | "TODO" | "DONE">("ALL");

  const { data } = useTodosQuery();
  const todosCount = data?.totalCount ?? 0;

  return (
    <section className="h-screen">
      <TodosLayout>
        <TodoHeader
          tab={tab}
          onTabChange={setTab}
          count={todosCount}
          onAdd={() => console.log("할 일 추가")}
        />

        <Suspense>
          <TodosContent tab={tab} />
        </Suspense>
      </TodosLayout>
    </section>
  );
}
