export default function NoteDetailSkeleton() {
  return (
    <div className="flex flex-col">
      <header className="border-b border-gray-100 pb-7">
        <div className="bg-gray-80 mb-4 h-8 w-2/3 animate-pulse rounded sm:h-10" />
        <div className="space-y-2">
          <div className="bg-gray-80 h-4 w-40 animate-pulse rounded" />
          <div className="bg-gray-80 h-4 w-48 animate-pulse rounded" />
          <div className="bg-gray-80 h-4 w-32 animate-pulse rounded" />
        </div>
      </header>
      <div className="mt-6 space-y-2.5">
        <div className="bg-gray-80 h-4 w-full animate-pulse rounded" />
        <div className="bg-gray-80 h-4 w-full animate-pulse rounded" />
        <div className="bg-gray-80 h-4 w-3/4 animate-pulse rounded" />
        <div className="bg-gray-80 h-4 w-full animate-pulse rounded" />
        <div className="bg-gray-80 h-4 w-5/6 animate-pulse rounded" />
        <div className="bg-gray-80 h-4 w-full animate-pulse rounded" />
        <div className="bg-gray-80 h-4 w-2/3 animate-pulse rounded" />
      </div>
    </div>
  );
}
