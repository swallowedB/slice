type CircularProgressProps = {
  percent: number;
};

export default function CircularProgress({ percent }: CircularProgressProps) {
  // viewBox 내부 계산은 고정값
  const size = 100;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const safePercent = Math.min(100, Math.max(0, percent));
  const offset = circumference - (safePercent / 100) * circumference;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      preserveAspectRatio="xMidYMid meet"
      className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 2xl:h-40 2xl:w-40">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        className="stroke-blue-300"
        strokeWidth={strokeWidth}
        fill="none"
      />

      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#fff"
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
