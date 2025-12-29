function SkeletonBox({ className }: { className: string }) {
    return (
      <div
        className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      />
    );
  }