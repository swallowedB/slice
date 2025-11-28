type CircularProgressProps = {
  percent: number;
  size: number; // ✅ 그냥 px로 받기
};
export default function CircularProgress({
  percent,
  size,
}: CircularProgressProps) {
  const strokeWidth = 24;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        className="stroke-blue-300"
        strokeWidth={strokeWidth}
        fill="none"
      />

      <g transform={`rotate(90deg)`}>
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
