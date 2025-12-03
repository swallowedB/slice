import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "primary" | "outline-orange" | "outline-gray";
type ButtonSize = "full" | "compact";

interface ButtonProps {
  type?: ButtonType;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const VARIANT_CONFIG: Record<ButtonVariant, string> = {
  primary: "bg-orange-250 text-white hover:bg-orange-400",
  "outline-orange":
    "text-orange-250 border-orange-250 border hover:border-orange-400 hover:text-orange-400",
  "outline-gray":
    "border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-650",
};

export default function Button({
  type = "button",
  children,
  variant = "primary",
  size = "full",
  isDisabled = false,
  className,
  onClick,
}: ButtonProps) {
  const baseStyles = "cursor-pointer rounded-full font-semibold";

  const sizeStyles =
    size === "full"
      ? "w-full py-3 text-base sm:py-3.5 sm:text-lg"
      : "min-w-26 py-2.5 text-sm";

  const variantStyles = !isDisabled && VARIANT_CONFIG[variant];

  const disabledStyles =
    isDisabled &&
    clsx(
      "pointer-events-none cursor-not-allowed",
      variant === "primary"
        ? "bg-gray-300 text-white"
        : "border border-gray-200 text-gray-300",
    );

  const buttonClasses = twMerge(
    clsx(baseStyles, sizeStyles, variantStyles, disabledStyles),
    className,
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={isDisabled}
      onClick={onClick}>
      {children}
    </button>
  );
}
