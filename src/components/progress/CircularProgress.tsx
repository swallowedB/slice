type CircularProgressProps = {
  percent: number;
  size: number;
};

export default function CircularProgress({
  percent,
  size,
}: CircularProgressProps) {
  const strokeWidth = size === 160 ? 24 : 14;
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;
  const safePercent = Math.min(100, Math.max(0, percent));
  const offset = circumference - (safePercent / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      overflow="visible">
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
          strokeDashoffset={-offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </g>
    </svg>
  );
}
