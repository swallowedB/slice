import { CSSProperties } from "react";
import { SkeletonVariant } from "./ListSkeleton";

type SkeletonBlockProps = {
  className?: string;
  style?: CSSProperties;
  variant?: SkeletonVariant;
};

const BASE_BG = {
  light: "bg-gray-80",
  dark: "bg-white/20",
};

export function ListBlockSkeleton({
  className = "",
  style,
  variant = "dark",
}: SkeletonBlockProps) {
  return (
    <div
      style={style}
      className={`animate-pulse rounded-md ${BASE_BG[variant]} ${className} `}
    />
  );
}
