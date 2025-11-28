type ProgressBarProps = {
  percent: number; // 0 ~ 100
};

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <>
      <div className="w-full min-w-76">
        <div className="h-[8px] w-full overflow-hidden rounded-full bg-[#e9e9e9]">
          <div
            className="bg-orange-250 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <span className="text-orange-250 ml-2.5 text-base font-bold">
        {percent}%
      </span>
    </>
  );
}
