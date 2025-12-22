import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { toast as sonnerToast } from "sonner";

interface ToastProps {
  id: string | number;
  message: string;
  variant: "success" | "error";
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

function CustomToast({ message, variant }: ToastProps) {
  const config = VARIANTS[variant];

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
    </div>
  );
}

export const toast = {
  success: (message: string) => {
    sonnerToast.custom((id) => (
      <CustomToast
        id={id}
        message={message}
        variant="success"
      />
    ));
  },

  error: (message: string) => {
    sonnerToast.custom((id) => (
      <CustomToast
        id={id}
        message={message}
        variant="error"
      />
    ));
  },
};
