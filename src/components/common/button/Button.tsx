import clsx from "clsx";

type ButtonVariant = "primary" | "outline-orange" | "outline-gray";
type ButtonSize = "full" | "compact";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  className?: string;
  onClick: () => void;
}

const VARIANT_CONFIG: Record<ButtonVariant, Record<ButtonSize, string>> = {
  primary: {
    full: "bg-orange-250 text-white hover:bg-orange-400",
    compact: "bg-orange-250 text-white hover:bg-orange-400",
  },
  "outline-orange": {
    full: "", // 디자인 x
    compact:
      "text-orange-250 border-orange-250 border hover:border-orange-400 hover:text-orange-400",
  },
  "outline-gray": {
    full: "border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-650",
    compact:
      "hover:text-gray-65 border border-gray-200 text-gray-600 hover:border-gray-300",
  },
};

export default function Button({
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

  const variantStyles = !isDisabled && VARIANT_CONFIG[variant][size];

  const disabledStyles =
    isDisabled &&
    clsx(
      "pointer-events-none cursor-not-allowed",
      variant === "primary"
        ? "bg-gray-300 text-white"
        : "border border-gray-200 text-gray-300",
    );

  const buttonClasses = clsx(
    baseStyles,
    sizeStyles,
    variantStyles,
    disabledStyles,
    className,
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
