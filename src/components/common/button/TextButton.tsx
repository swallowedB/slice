import clsx from "clsx";

interface TextButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  isDisabled?: boolean;
  className?: string;
  onClick: () => void;
}

export default function TextButton({
  children,
  variant = "primary",
  isDisabled = false,
  className,
  onClick,
}: TextButtonProps) {
  const buttonClasses = clsx(
    "cursor-pointer text-xs font-semibold whitespace-nowrap sm:text-sm lg:text-base",

    !isDisabled && {
      "text-orange-250 hover:text-orange-400": variant === "primary",
      "text-gray-600 hover:text-gray-650": variant === "secondary",
    },

    isDisabled && "pointer-events-none cursor-not-allowed text-gray-400",

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
