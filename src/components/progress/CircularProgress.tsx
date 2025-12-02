"use client";

type CircularProgressProps = {
  percent: number;
  variant?: "default" | "large";
  strokeColor?: string;
};

export default function CircularProgress({
  percent,
  variant = "default",
  strokeColor = "#009D97",
}: CircularProgressProps) {
  const vbSize = 100;
  const strokeWidth = variant === "large" ? 24 : 14;

  const radius = (vbSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.min(100, Math.max(0, percent)) / 100;

  const offset = circumference * (1 - progress);

  // 렌더링 크기 (반응형)
  const sizeClasses =
    variant === "large"
      ? "w-[162px] h-[162px]"
      : "w-23 h-23 sm:w-20 sm:h-20 lg:w-32 lg:h-32 2xl:w-40 2xl:h-40";

  const cx = vbSize / 2;
  const cy = vbSize / 2;

  return (
    <svg
      viewBox={`0 0 ${vbSize} ${vbSize}`}
      preserveAspectRatio="xMidYMid meet"
      className={sizeClasses}>
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
      />

      <g
        transform={`
          translate(${cx}, ${cy})
          scale(1, -1)
          translate(${-cx}, ${-cy})
          rotate(-270 ${cx} ${cy})
        `}>
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={"#fff"}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </g>
    </svg>
  );
}
