"use client";

import { useState, useEffect } from "react";

import { useCreateMutation } from "@/hooks/queries/todos/useCreateMutation";
import { useEditMutation } from "@/hooks/queries/todos/useEditMutation";
import { useDeviceSize } from "@/hooks/useDeviceSize";

import { useGoalList } from "@/hooks/queries/goals/useGoalList";
import { Todo, EditTodo } from "@/api/types/todo";
import { Goal } from "@/api/types/goal";

import TodoFormUI from "./TodoFormUI";
import TodoFormLayout from "./TodoFormLayout";

export interface TodoFormData {
  title: string;
  goal: string;
  status: "TODO" | "DONE";
  link: string;
  file: File | null;
}

export type TodoFormMode = "create" | "edit";

interface TodoFormContentProps {
  mode: TodoFormMode;
  onClose: () => void;
  todoId?: number;
  todo?: Todo;
  onConfirm?: (data: TodoFormData) => void;
}

export default function TodoFormContent({
  mode,
  onClose,
  todoId,
  todo,
}: TodoFormContentProps & { sizeClass?: string }) {
  const { isMobile } = useDeviceSize();
  const isEdit = mode === "edit";

  const createTodoMutation = useCreateMutation();
  const editTodoMutation = useEditMutation();

  const { data: goalData } = useGoalList();
  const goals: Goal[] = goalData?.goals ?? [];

  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState<Goal | null>(null);
  const [status, setStatus] = useState<"TODO" | "DONE">("TODO");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isGoalOpen, setIsGoalOpen] = useState(false);

  const isConfirmDisabled = !title.trim() || !goal;

  useEffect(() => {
    if (!isEdit || !todo) return;

    setTitle(todo.title);
    setStatus(todo.done ? "DONE" : "TODO");
    setLink(todo.linkUrl ?? "");
    setFile(null);

    const matchedGoal = goals.find((goal) => goal.id === todo.goal.id) ?? null;
    setGoal(matchedGoal);
  }, [isEdit, todo, goals]);

  const handleConfirm = () => {
    if (!goal) return;

    const payload: EditTodo = {
      title,
      goalId: goal.id,
      linkUrl: link,
      fileUrl: file?.name,
      done: status === "DONE",
    };

    if (mode === "edit" && todoId) {
      editTodoMutation.mutate(
        { todoId, payload },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
      return;
    }

    createTodoMutation.mutate(payload, {
      onSuccess: () => {
        onClose();
      },
    });
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
        goals={goals}
      />
    </TodoFormLayout>
  );
}
