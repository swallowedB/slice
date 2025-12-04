"use client";

import { useState } from "react";
import TaskFormContent from "./_components/TaskFormContent";

export default function Page() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    console.log("제출 데이터:");
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
          /* create, edit 모드 선택 */
          mode="edit"
          onClose={() => setOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
