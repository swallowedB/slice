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

  const radius = (vbSize - 14) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.min(100, Math.max(0, percent)) / 100;

  const offset = circumference * (1 - progress);

  const sizeClasses =
    variant === "large"
      ? "w-[92px] h-[92px] lg:w-[162px] lg:h-[162px]"
      : "w-[92px] h-[92px]";

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
        strokeWidth="14"
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
          strokeWidth="14"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-[800ms] ease-out"
        />
      </g>
    </svg>
  );
}
