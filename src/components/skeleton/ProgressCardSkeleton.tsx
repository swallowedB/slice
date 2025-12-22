export default function ProgressCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="loading"
      className="flex h-full items-center justify-start gap-5 pl-6 lg:pl-10 xl:justify-center xl:gap-3 xl:pl-0 2xl:justify-start 2xl:gap-6 2xl:pl-12">
      {/* Circle */}
      <div className="h-40 w-40 rounded-full border-25 border-white/30" />

      {/* Text */}
      <div className="space-y-4">
        <div className="h-5 w-36 rounded bg-white/30" />
        <div className="h-16 w-28 rounded bg-white/40" />
      </div>
    </div>
  );
}
