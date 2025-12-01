import Button from "@/components/common/button/Button";
import ProgressBar from "../progress/ProgressBar";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import TextButton from "@/components/common/button/TextButton";

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
    <div className="flex items-start justify-between sm:items-center">
      <div className="w-full pl-2.5 sm:w-auto lg:flex lg:items-center lg:pl-3.5">
        <h4 className="mb-3 line-clamp-2 pr-20 font-semibold break-keep sm:line-clamp-1 sm:w-105 sm:text-sm lg:mb-0 lg:w-60 lg:pr-7.5 lg:text-base">
          {title}
        </h4>

        <ProgressBar percent={percent} />
      </div>

      <div className="flex pr-2.5">
        <Button
          variant="outline-gray"
          size="compact"
          className="hidden sm:block"
          onClick={() => console.log("mock up")}>
          <p className="absolute top-7.25 right-5 flex w-18.5 items-center justify-center font-semibold sm:static sm:w-full">
            <PlusIcon className="mr-1 h-4 w-4 sm:mr-1.5 sm:h-4.5 sm:w-4.5" />
            할일추가
          </p>
        </Button>

        <TextButton
          variant="primary"
          className="block sm:hidden"
          onClick={() => console.log("mock up")}>
          <p className="absolute top-7.25 right-5 flex w-18.5 items-center justify-center font-semibold sm:static sm:w-full">
            <PlusIcon className="mr-1 h-4 w-4 sm:mr-1.5 sm:h-4.5 sm:w-4.5" />
            할일추가
          </p>
        </TextButton>

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
