export default function CircularProgress({ percent }: { percent: number }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg
      width="150"
      height="150">
      {/* 배경 원 */}
      <circle
        cx="75"
        cy="75"
        r={radius}
        stroke="#E5E7EB"
        strokeWidth="12"
        fill="none"
      />

      {/* 진행 원 */}
      <circle
        cx="75"
        cy="75"
        r={radius}
        stroke="#0AC5A8"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transition: "stroke-dashoffset 1s ease-out",
        }}
      />
    </svg>
  );
}
