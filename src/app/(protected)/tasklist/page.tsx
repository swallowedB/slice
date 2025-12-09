"use client";

import TaskHeader from "./_components/TaskHeader";
import TaskListContent from "./_components/TaskContent";
import MobileHeader from "../_components/layout/MobileHeader";
import { useState } from "react";
import TaskListLayout from "./_components/TaskListLayout";

export default function TasklistPage() {
  const [tab, setTab] = useState<"ALL" | "TODO" | "DONE">("ALL");

  return (
    <section>
      <MobileHeader title="모든 할 일" />
      <h2 className="color-black hidden sm:block sm:pl-4 sm:text-2xl sm:font-semibold">
        모든 할 일
      </h2>
      <TaskListLayout>
        <TaskHeader
          tab={tab}
          onTabChange={(t) => setTab(t)}
          onAdd={() => console.log("할 일 추가")}
          className="mb-3"
        />
        <TaskListContent tab={tab} />
      </TaskListLayout>
    </section>
  );
}
