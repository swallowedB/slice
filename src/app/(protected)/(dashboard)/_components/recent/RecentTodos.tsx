import ListItem from "@/components/common/list/list-item/ListItem";
import { ListTodoType } from "@/components/common/list/list-item/listItem.types";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
type RecentTodosProps = {
  mockRecentItem: ListTodoType[];
  onChange: (id: number) => void;
};
export default function RecentTodos({
  mockRecentItem,
  onChange,
}: RecentTodosProps) {
  return (
    <div className="w-full">
      <h3 className="mb-2.5 flex flex-wrap items-center justify-between pr-3.5 pl-2 text-base font-medium lg:text-lg">
        <p className="flex flex-wrap items-center">
          <img
            src="/icons/icon-todo.svg"
            alt="할일 아이콘"
            className="mr-2 h-8 w-8 lg:mr-3 lg:h-10 lg:w-10"
          />
          최근 등록한 할일
        </p>
        <Link
          className="text-orange-250 flex items-center text-sm font-semibold lg:text-base"
          href="./page.tsx">
          모두 보기
          <ChevronRightIcon className="text-orange-250 ml-0.5 w-3.5 sm:ml-0 sm:w-5" />
        </Link>
      </h3>
      <div className="bg-orange-250 h-46.5 rounded-[28px] px-4 py-4.5 shadow-[0_10px_40px_0_rgba(255,158,89,0.4)] transition-all sm:p-3.75 lg:h-64 lg:rounded-[40px] lg:p-7.5 lg:hover:shadow-[0_10px_40px_0_rgba(255,158,89,0.4)]">
        {mockRecentItem.length === 0 ? (
          <p className="flex h-full items-center justify-center text-base font-semibold text-white">
            최근에 등록한 할 일이 없어요
          </p>
        ) : (
          <ListItem
            className="grid gap-0.5 lg:gap-1.5"
            items={[...mockRecentItem]}
            onChange={onChange}
            variant="white"
          />
        )}
      </div>
    </div>
  );
}
