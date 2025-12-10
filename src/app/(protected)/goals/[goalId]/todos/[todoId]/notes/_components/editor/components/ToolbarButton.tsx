import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  children: React.ReactNode;
}

export default function ToolbarButton({
  isActive = false,
  children,
  ...props
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        "flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-gray-100",
        {
          "text-orange-250": isActive,
          "text-gray-700": !isActive,
        },
      )}>
      {children}
    </button>
  );
}
