"use client";

import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useState } from "react";
import TodoFormUI from "./TodoFormUI";
import TodoFormLayout from "./TodoFormLayout";

export type TodoFormMode = "create" | "edit";

export interface TodoFormData {
  title: string;
  goal: string;
  status: "TODO" | "DONE";
  link: string;
  file: File | null;
}

const mockGoals = [
  "자바스크립트로 웹 서비스 만들기",
  "디자인 시스템 강의 듣기",
];

interface TodoFormContentProps {
  mode: TodoFormMode;
  onClose: () => void;
  onConfirm: (data: TodoFormData) => void;
}

export default function TodoFormContent({
  mode,
  onClose,
  onConfirm,
}: TodoFormContentProps & { sizeClass?: string }) {
  const { isMobile } = useDeviceSize();
  const isEdit = mode === "edit";

  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState<"TODO" | "DONE">("TODO");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isGoalOpen, setIsGoalOpen] = useState(false);

  const isConfirmDisabled = !title.trim() || !goal.trim();

  const handleConfirm = () => {
    if (isConfirmDisabled) return;
    onConfirm({ title, goal, status, link, file });
  };

  return (
    <TodoFormLayout
      isMobile={isMobile}
      mode={mode}
      onClose={onClose}
      onConfirm={handleConfirm}
      isConfirmDisabled={isConfirmDisabled}
      sizeClass={"w-[488px]"}>
      <TodoFormUI
        isEdit={isEdit}
        title={title}
        setTitle={setTitle}
        goal={goal}
        setGoal={setGoal}
        link={link}
        setLink={setLink}
        status={status}
        setStatus={setStatus}
        file={file}
        setFile={setFile}
        isGoalOpen={isGoalOpen}
        setIsGoalOpen={setIsGoalOpen}
        goals={mockGoals}
      />
    </TodoFormLayout>
  );
}
