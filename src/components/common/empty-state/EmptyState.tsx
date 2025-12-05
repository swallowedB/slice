type EmptyStateProps = {
  variant?: "gray" | "yellow";
  children: React.ReactNode;
};

export default function EmptyState({
  variant = "gray",
  children,
}: EmptyStateProps) {
  const iconSrc =
    variant === "yellow"
      ? "/icons/icon-empty-yellow.svg"
      : "/icons/icon-empty.svg";

  return (
    <div className="m-auto flex flex-col items-center py-26 text-sm font-medium text-gray-600 sm:text-base lg:py-31.75">
      <img
        src={iconSrc}
        alt="empty 아이콘"
        className="mb-4.5 w-20 sm:w-32.5"
      />
      {children}
    </div>
  );
}
