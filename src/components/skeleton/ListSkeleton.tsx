import { ListBlockSkeleton } from "./ListBlockSkeleton";

export type SkeletonVariant = "light" | "dark";

type ListSkeletonProps = {
  count?: number;
  rowClassName?: string;
  variant?: SkeletonVariant;
};
export function ListSkeleton({
  count = 4,
  rowClassName = "h-10 lg:h-12",
  variant,
}: ListSkeletonProps) {
  return (
    <div
      className="grid gap-2"
      role="status"
      aria-label="loading">
      {Array.from({ length: count }).map((_, i) => (
        <ListBlockSkeleton
          variant={variant}
          key={i}
          className={`${rowClassName}`}
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}
