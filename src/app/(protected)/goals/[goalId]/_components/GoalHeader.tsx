"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

type GoalHeaderProps = {
  title: string;
  onMenuClick?: () => void;
};

export default function GoalHeader({ title, onMenuClick }: GoalHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-4 sm:rounded-3xl sm:px-6 sm:py-6 md:px-3 md:py-8.75 lg:mb-0 xl:rounded-4xl xl:px-10 xl:py-15">
      <img
        src="/icons/icon-goal.svg"
        alt="목표 아이콘"
        className="h-8 w-8 xl:h-10 xl:w-10"
      />

      <h3 className="truncate text-base font-semibold break-keep sm:text-xl xl:text-2xl">
        {title}
      </h3>

      <button
        className="ml-auto cursor-pointer"
        onClick={onMenuClick}>
        <EllipsisVerticalIcon className="h-6 w-6 text-gray-400" />
      </button>
    </div>
  );
}
