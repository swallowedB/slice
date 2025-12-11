type ProgressBarProps = {
  percent: number;
};

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="flex items-center">
      <div className="w-full sm:w-62 lg:w-76">
        <div className="h-[8px] w-full overflow-hidden rounded-full bg-[#e9e9e9]">
          <div
            className="bg-orange-250 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <span className="text-orange-250 ml-2.5 text-xs leading-[1] font-semibold sm:text-sm sm:font-bold lg:text-base">
        {percent}%
      </span>
    </div>
  );
}
