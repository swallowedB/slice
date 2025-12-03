"use client";

import TaskHeader from "./_components/TaskHeader";
import TaskListContent from "./_components/TaskContent";
import { useState } from "react";

export default function TasklistPage() {
  const [tab, setTab] = useState<"ALL" | "TODO" | "DONE">("ALL");

  return (
    <div className="h-screen">
      <TaskHeader
        tab={tab}
        onTabChange={(t) => setTab(t)}
        onAdd={() => console.log("할 일 추가")}
      />
      <TaskListContent />
    </div>
  );
}
