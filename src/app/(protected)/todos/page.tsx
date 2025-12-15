"use client";

import { useState, Suspense } from "react";
import PageHeader from "../_components/layout/PageHeader";
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
      <h2 className="color-black hidden sm:block sm:pl-4 sm:text-2xl sm:font-semibold">
        <PageHeader
          title={`모든 할 일 ${todosCount}`}
          desktopClassName="sm:mb-2"
        />
      </h2>
      <TodosLayout>
        <TodoHeader
          tab={tab}
          onTabChange={(t) => setTab(t)}
          onAdd={() => console.log("할 일 추가")}
          className="mb-3"
        />

        <Suspense>
          <TodosContent tab={tab} />
        </Suspense>
      </TodosLayout>
    </section>
  );
}
