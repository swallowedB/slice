"use client";

import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline-orange" | "outline-gray";
  isFullWidth?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
};

export default function Button({
  children,
  variant = "primary",
  isFullWidth = true,
  isDisabled = false,
  onClick,
}: ButtonProps) {
  const isPrimary = variant === "primary";
  const isOutlineOrange = variant === "outline-orange";
  const isOutlineGray = variant === "outline-gray";

  const baseStyles = "cursor-pointer rounded-full font-semibold";

  const sizeStyles = isFullWidth
    ? "box-border h-14 w-full text-base sm:text-lg"
    : "text-sm sm:box-border sm:h-10 sm:w-28";

  const variantStyles =
    !isDisabled &&
    clsx({
      "bg-orange-300 text-white hover:bg-orange-400": isFullWidth && isPrimary,

      "border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-650":
        isFullWidth && isOutlineGray,

      "text-gray-600 hover:text-gray-650 sm:bg-orange-300 sm:text-white sm:hover:bg-orange-400 sm:hover:text-white":
        !isFullWidth && isPrimary,

      "text-orange-300 hover:border-orange-400 hover:text-orange-400 sm:border sm:border-orange-300":
        !isFullWidth && isOutlineOrange,

      "text-orange-300 hover:border-gray-300 hover:text-orange-400 sm:border sm:border-gray-200 sm:text-gray-600 sm:hover:text-gray-650":
        !isFullWidth && isOutlineGray,
    });

  const disabledStyles =
    isDisabled &&
    clsx({
      "pointer-events-none cursor-not-allowed": true,
      "bg-gray-300 text-white": isFullWidth,
      "text-gray-400 sm:bg-gray-300 sm:text-white": !isFullWidth,
    });

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
