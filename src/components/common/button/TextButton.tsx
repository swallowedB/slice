import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonType = "button" | "submit" | "reset";
type TextButtonVariant = "primary" | "secondary";

interface TextButtonProps {
  type?: ButtonType;
  children: React.ReactNode;
  variant?: TextButtonVariant;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const VARIANT_CONFIG: Record<TextButtonVariant, string> = {
  primary: "text-orange-250 hover:text-orange-400",
  secondary: "text-gray-600 hover:text-gray-650",
};

export default function TextButton({
  type = "button",
  children,
  variant = "primary",
  isDisabled = false,
  className,
  onClick,
}: TextButtonProps) {
  const baseStyles =
    "cursor-pointer text-xs font-semibold whitespace-nowrap sm:text-sm lg:text-base";

  const variantStyles = !isDisabled && VARIANT_CONFIG[variant];

  const disabledStyles =
    isDisabled && "pointer-events-none cursor-not-allowed text-gray-400";

  const buttonClasses = twMerge(
    clsx(baseStyles, variantStyles, disabledStyles),
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
