import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ListItemVariant } from "../list-item-actions/types";

type ListItemButtonProps = {
  icon: ReactNode;
  variant?: ListItemVariant;
  className?: string;
  ariaLabel: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ListItemButton({
  icon,
  variant = "default",
  className,
  ariaLabel,
  ...props
}: ListItemButtonProps) {
  const listButtonClasses = clsx(
    "flex h-6 w-6 items-center justify-center rounded-full cursor-pointer transition-opacity",
    variant === "white" ? "bg-white/40" : "bg-orange-400/20",
    "disabled:cursor-not-allowed disabled:opacity-40",
    className,
  );

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={listButtonClasses}
      {...props}>
      {icon}
    </button>
  );
}
