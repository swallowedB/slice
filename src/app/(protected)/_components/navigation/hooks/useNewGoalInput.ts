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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const submittedRef = useRef(false);
  const prevSignalRef = useRef(newGoalInputSignal);

  const closingByOutsideRef = useRef(false);

  const closeInput = () => {
    setIsCreating(false);
    setTitle("");
    submittedRef.current = false;
    closingByOutsideRef.current = false;
  };

  useEffect(() => {
  const prev = prevSignalRef.current;
  prevSignalRef.current = newGoalInputSignal;

  if (newGoalInputSignal <= prev) return;

  setIsCreating(true);
  setTitle("");
  submittedRef.current = false;
  closingByOutsideRef.current = false;

  requestAnimationFrame(() => {
    inputRef.current?.focus();
  });
}, [newGoalInputSignal]);

  useEffect(() => {
    if (!isCreating) return;

    const onPointerDown = (e: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const target = e.target as Node | null;
      const clickedInside = target ? container.contains(target) : false;

      if (!clickedInside) {
        closingByOutsideRef.current = true;
        closeInput();
      }
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, {
        capture: true,
      });
    };
  }, [isCreating]);

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
    if (closingByOutsideRef.current) return;
    await submit();
  };

  return {
    isCreating,
    title,
    isPending,

    inputRef,
    containerRef,

    setTitle,
    onKeyDown,
    onBlur,

    closeInput,
    submit,
  };
}
