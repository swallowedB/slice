"use client";

import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useState } from "react";
import TaskFormUI from "./TaskFormUI";
import TaskFormLayout from "./TaskFormLayout";

export type TaskFormMode = "create" | "edit";

export interface TaskFormData {
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

interface TaskFormContentProps {
  mode: TaskFormMode;
  onClose: () => void;
  onConfirm: (data: TaskFormData) => void;
}

export default function TaskFormContent({
  mode,
  onClose,
  onConfirm,
}: TaskFormContentProps) {
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
    <TaskFormLayout
      isMobile={isMobile}
      mode={mode}
      onClose={onClose}
      onConfirm={handleConfirm}
      isConfirmDisabled={isConfirmDisabled}>
      <TaskFormUI
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
    </TaskFormLayout>
  );
}
