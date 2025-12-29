import { ListSkeleton } from "@/components/skeleton/ListSkeleton";

export default function TodosSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-white px-4 py-4 sm:px-8 sm:py-8">
      {/* 목표 선택 스켈레톤 */}
      <div className="mb-6 h-14 animate-pulse rounded-xl bg-gray-100" />

      {/* 할 일 리스트 스켈레톤 */}
      <ListSkeleton
        count={8}
        rowClassName="h-10 sm:h-12"
        variant="light"
      />
    </div>
  );
}
