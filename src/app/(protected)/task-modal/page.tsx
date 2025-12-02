"use client";

import { useState } from "react";
import TaskFormContent, { TaskFormData } from "./_components/TaskFormContent";

export default function Page() {
  const [open, setOpen] = useState(false);

  const handleConfirm = (data: TaskFormData) => {
    console.log("제출 데이터:", data);
    setOpen(false);
  };

  return (
    <div className="p-10">
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-orange-400 px-4 py-2 text-white">
        열기
      </button>

      {open && (
        <TaskFormContent
          mode="create"
          onClose={() => setOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
