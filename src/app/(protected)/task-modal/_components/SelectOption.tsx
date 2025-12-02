import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/24/solid";

interface SelectOptionProps {
  label: string;
  value: "TODO" | "DONE";
  selected: boolean;
  onClick: () => void;
}

export function SelectOption({
  label,
  value,
  selected,
  onClick,
}: SelectOptionProps) {
  return (
    <label
      className="flex cursor-pointer items-center gap-2 select-none"
      onClick={onClick}>
      {/* 체크박스 */}
      <div
        className={clsx(
          "flex h-4 w-4 rounded-md transition-colors",
          selected
            ? "bg-[#FF8442] text-white"
            : "border border-gray-300 bg-white",
        )}>
        {selected && <CheckIcon className="h-4 w-4" />}
      </div>

      {/* 텍스트 */}
      <span className={"text-gray-500"}>{label}</span>
    </label>
  );
}
