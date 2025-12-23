"use client";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast as sonnerToast } from "sonner";

interface ToastProps {
  id: string | number;
  message: string;
  variant: "success" | "error";
  hasTime?: boolean;
}

const VARIANTS = {
  success: {
    bg: "bg-orange-50",
    text: "text-orange-400",
    icon: (
      <CheckCircleIcon
        strokeWidth={2}
        className="h-4 w-4"
      />
    ),
  },
  error: {
    bg: "bg-red-50",
    text: "text-red-600",
    icon: (
      <XCircleIcon
        strokeWidth={2}
        className="h-4 w-4"
      />
    ),
  },
} as const;

function CustomToast({ message, variant, hasTime }: ToastProps) {
  const config = VARIANTS[variant];
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!hasTime) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [hasTime]);

  const getTimeText = () => {
    if (elapsedTime === 0) return "방금 전";
    if (elapsedTime < 60) return `${elapsedTime}초 전`;

    const minutes = Math.floor(elapsedTime / 60);

    return `${minutes}분 전`;
  };

  return (
    <div
      className={clsx(
        "flex items-center gap-2 rounded-3xl px-4 py-2 sm:gap-1",
        "text-xs font-semibold sm:text-sm",
        config.bg,
        config.text,
      )}>
      {config.icon}
      <span>{message}</span>
      {hasTime && (
        <>
          <span>ㆍ</span>
          <span>{getTimeText()}</span>
        </>
      )}
    </div>
  );
}

interface ToastOptions {
  hasTime?: boolean;
}

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    sonnerToast.custom((id) => (
      <CustomToast
        id={id}
        message={message}
        variant="success"
        hasTime={options?.hasTime}
      />
    ));
  },

  error: (message: string, options?: ToastOptions) => {
    sonnerToast.custom((id) => (
      <CustomToast
        id={id}
        message={message}
        variant="error"
        hasTime={options?.hasTime}
      />
    ));
  },
};
