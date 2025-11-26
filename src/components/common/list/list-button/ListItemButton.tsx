import clsx from "clsx";
import { ListItemVariant } from "../list-item/listItem.types";

type ListItemButtonProps = {
  icon: React.ReactNode;
  variant?: ListItemVariant;
  className?: string;
};
export default function ListItemButton({
  icon,
  variant = "default",
  className,
}: ListItemButtonProps) {
  const listButtonClasses = clsx(
    "flex h-6 w-6 items-center justify-center rounded-full",
    variant === "white" ? "bg-white/40" : "bg-orange-400/20",
    className,
  );

  return (
    <button
      type="button"
      className={listButtonClasses}>
      {icon}
    </button>
  );
}
