"use client";

import TodoHeader from "./_components/TodoHeader";
import TodosContent from "./_components/TodosContent";
import { useState } from "react";
import TodosLayout from "./_components/TodosLayout";
import MobileHeader from "@/app/(protected)/_components/layout/MobileHeader";

export default function TodosPage() {
  const [tab, setTab] = useState<"ALL" | "TODO" | "DONE">("ALL");

  return (
    <section>
      <MobileHeader title="모든 할 일" />
      <h2 className="color-black hidden sm:block sm:pl-4 sm:text-2xl sm:font-semibold">
        모든 할 일
      </h2>
      <TodosLayout>
        <TodoHeader
          tab={tab}
          onTabChange={(t) => setTab(t)}
          onAdd={() => console.log("할 일 추가")}
          className="mb-3"
        />
        <TodosContent tab={tab} />
      </TodosLayout>
    </section>
  );
}
