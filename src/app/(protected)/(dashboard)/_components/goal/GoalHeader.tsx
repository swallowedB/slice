import TodoButton from "@/app/(protected)/_components/todo-button/TodoButton";
import ProgressBar from "../todos/progress/ProgressBar";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type GoalHeaderProps = {
  title: string;
  percent: number;
  isOpen: boolean;
  onToggle: () => void;
};

export default function GoalHeader({
  title,
  percent,
  onToggle,
  isOpen,
}: GoalHeaderProps) {
  return (
    <div className="flex items-start justify-between sm:grid sm:grid-cols-2 sm:items-center lg:flex lg:flex-col lg:items-start xl:flex-row xl:items-center">
      <div className="lg: w-full pl-2.5 sm:w-auto lg:grid lg:grid-rows-[auto_auto] lg:gap-1 lg:pl-3.5 2xl:grid 2xl:grid-cols-2 2xl:items-center">
        <h4 className="mb-3 line-clamp-2 pr-20 font-semibold break-keep sm:line-clamp-1 sm:text-sm lg:mb-0 lg:pr-7.5 lg:text-base">
          {title}
        </h4>

        <ProgressBar percent={percent} />
      </div>

      <div className="flex pr-2.5 sm:ml-auto lg:mt-4 xl:mt-0">
        <TodoButton className="top-7.25" />

        <button
          onClick={onToggle}
          className={`${
            isOpen ? "rotate-180" : ""
          } hover:text-gray-650 absolute bottom-3.5 left-1/2 mt-2.5 ml-0 h-8 w-8 -translate-x-1/2 transform cursor-pointer rounded-full border border-gray-200 text-gray-600 hover:border-gray-300 sm:static sm:mt-0 sm:ml-4 sm:h-10 sm:w-10 sm:translate-x-0 sm:transform-none`}>
          <ChevronDownIcon
            width={20}
            className="m-auto"
          />
        </button>
      </div>
    </div>
  );
}
