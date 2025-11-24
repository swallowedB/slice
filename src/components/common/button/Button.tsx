import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  isFullWidth?: boolean;
  isRounded?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
};

export default function Button({
  children,
  variant = "primary",
  isFullWidth = true,
  isRounded = false,
  isDisabled = false,
  onClick,
}: ButtonProps) {
  const buttonClasses = clsx(
    "cursor-pointer rounded-2xl px-3 pt-2.5 pb-2.5 text-sm font-semibold sm:px-6",

    isFullWidth && "w-full pt-4.5 pb-4.5 text-xl font-bold",

    !isDisabled && {
      "bg-orange-300 text-white hover:bg-orange-400": variant === "primary",
      "border border-orange-300 text-orange-400 hover:border-orange-400 hover:text-orange-500":
        variant === "outline",
    },

    isRounded && "rounded-4xl",
    isDisabled &&
      "pointer-events-none cursor-not-allowed bg-gray-300 text-white",
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
