import { CSSProperties } from "react";

type SkeletonBlockProps = {
  className?: string;
  style?: CSSProperties;
};

export function SkeletonBlock({ className = "" }: SkeletonBlockProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-white/25 ${className} `}>
      <div className="animate-skeleton-shimmer absolute inset-0 w-[200%] -translate-x-1/2 bg-linear-to-r from-transparent via-white/40 to-transparent will-change-transform" />
    </div>
  );
}
