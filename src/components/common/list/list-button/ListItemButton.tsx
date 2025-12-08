import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ListItemVariant } from "../list-item/types";

type ListItemButtonProps = {
  icon: ReactNode;
  variant?: ListItemVariant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ListItemButton({
  icon,
  variant = "default",
  className,
  ...props
}: ListItemButtonProps) {
  const listButtonClasses = clsx(
    "flex h-6 w-6 items-center justify-center rounded-full",
    variant === "white" ? "bg-white/40" : "bg-orange-400/20",
    className,
  );

  return (
    <button
      type="button"
      className={listButtonClasses}
      {...props} // onClick 포함 모든 속성 전달
    >
      {icon}
    </button>
  );
}
