import { SkeletonBlock } from "./SkeletonBlock";

type ListSkeletonProps = {
  count?: number;
  rowClassName?: string;
};
export function ListSkeleton({
  count = 4,
  rowClassName = "h-10 lg:h-12",
}: ListSkeletonProps) {
  return (
    <div className="grid gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBlock
          key={i}
          className={`${rowClassName}`}
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}
