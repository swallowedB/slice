"use client";

import { useCreateGoalMutation } from "@/hooks/queries/goals/useCreateGoalMutation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface UseNewGoalInputParams {
  newGoalInputSignal: number;
}

export function useNewGoalInput({ newGoalInputSignal }: UseNewGoalInputParams) {
  const router = useRouter();
  const { mutateAsync: createGoal, isPending } = useCreateGoalMutation();

  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const submittedRef = useRef(false);

  const didMountRef = useRef(false);

  const closeInput = () => {
    setIsCreating(false);
    setTitle("");
    submittedRef.current = false;
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    setIsCreating(true);
    setTitle("");
    submittedRef.current = false;

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [newGoalInputSignal]);

  const submit = async () => {
    if (submittedRef.current) return;
    if (isPending) return;

    const trimmed = title.trim();
    if (!trimmed) {
      closeInput();
      return;
    }

    submittedRef.current = true;

    try {
      const created = await createGoal(trimmed);
      closeInput();
      router.push(`/goals/${created.id}`);
    } catch (e) {
      submittedRef.current = false;
      inputRef.current?.focus();
      console.error(e);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await submit();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      closeInput();
    }
  };

  const onBlur: React.FocusEventHandler<HTMLInputElement> = async () => {
    await submit();
  };

  return {
    isCreating,
    title,
    isPending,

    inputRef,

    setTitle,
    onKeyDown,
    onBlur,

    closeInput,
    submit,
  };
}
