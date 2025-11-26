"use client";

import clsx from "clsx";

type ButtonVariant = "primary" | "outline-orange" | "outline-gray";
type ButtonSize = "full" | "compact";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  onClick: () => void;
};

const VARIANT_CONFIG: Record<ButtonVariant, Record<ButtonSize, string>> = {
  primary: {
    full: "bg-orange-250 text-white hover:bg-orange-400",
    compact:
      "text-gray-600 hover:text-gray-650 sm:bg-orange-250 sm:text-white sm:hover:bg-orange-400 sm:hover:text-white",
  },
  "outline-orange": {
    full: "", // 디자인 x
    compact:
      "text-orange-250 hover:border-orange-400 hover:text-orange-400 sm:border sm:border-orange-250",
  },
  "outline-gray": {
    full: "border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-650",
    compact:
      "text-orange-250 hover:border-gray-300 hover:text-orange-400 sm:border sm:border-gray-200 sm:text-gray-600 sm:hover:text-gray-650",
  },
};

export default function Button({
  children,
  variant = "primary",
  size = "full",
  isDisabled = false,
  onClick,
}: ButtonProps) {
  const baseStyles = "cursor-pointer rounded-full font-semibold";

  const sizeStyles =
    size === "full"
      ? "h-14 w-full text-base sm:text-lg"
      : "text-sm sm:h-10 sm:w-28";

  const variantStyles = !isDisabled && VARIANT_CONFIG[variant][size];

  const disabledStyles =
    isDisabled &&
    clsx(
      "pointer-events-none cursor-not-allowed",
      size === "full"
        ? "bg-gray-300 text-white"
        : "text-gray-400 sm:bg-gray-300 sm:text-white",
    );

  const buttonClasses = clsx(
    baseStyles,
    sizeStyles,
    variantStyles,
    disabledStyles,
  );

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      onClick={onClick}>
      {children}
    </button>
  );
}
