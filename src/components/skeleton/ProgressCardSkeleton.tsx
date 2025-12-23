export default function ProgressCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="loading"
      className="flex h-full items-center justify-start gap-5 xl:justify-center xl:gap-3 2xl:justify-start 2xl:gap-6">
      <div className="h-23 w-23 rounded-full border-13 border-white/30 lg:h-40 lg:w-40 lg:border-25" />

      <div className="space-y-4 text-white lg:text-left">
        <div className="h-4 w-28 rounded bg-white/30 md:h-5 md:w-36" />
        <div className="h-12 w-25 rounded bg-white/40 md:h-16" />
      </div>
    </div>
  );
}
