type ProgressBarProps = {
  percent: number; // 0 ~ 100
};

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <>
      <div className="w-full max-w-[240px]">
        <div className="h-[6px] w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-orange-400 transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <span className="text-sm font-bold text-orange-500">{percent}%</span>
    </>
  );
}
