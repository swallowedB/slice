import { CSSProperties } from "react";
import { SkeletonVariant } from "./ListSkeleton";

type SkeletonBlockProps = {
  className?: string;
  style?: CSSProperties;
  variant?: SkeletonVariant;
};

const BASE_BG = {
  light: "bg-gray-100",
  dark: "bg-white/20",
};

const SHIMMER = {
  light: "via-gray-200",
  dark: "via-white/40",
};

export function ListBlockSkeleton({
  className = "",
  style,
  variant = "dark",
}: SkeletonBlockProps) {
  return (
    <div
      style={style}
      className={`relative overflow-hidden rounded-md ${BASE_BG[variant]} ${className}`}>
      <div
        className={`absolute inset-0 w-[200%] -translate-x-1/2 bg-linear-to-r from-transparent ${SHIMMER[variant]} animate-skeleton-shimmer to-transparent will-change-transform`}
      />
    </div>
  );
}
