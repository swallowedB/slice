export default function NoteItemSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:px-8 sm:py-7">
      <div className="mb-2 border-b border-b-gray-100 pb-2 sm:mb-3.5 sm:pb-4 lg:mb-4 lg:pb-5">
        <div className="bg-gray-80 h-8 animate-pulse rounded lg:h-10" />
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-gray-80 h-5 w-13 animate-pulse rounded sm:h-6" />
        <div className="bg-gray-80 h-5 flex-1 animate-pulse rounded sm:h-6" />
      </div>
    </div>
  );
}
