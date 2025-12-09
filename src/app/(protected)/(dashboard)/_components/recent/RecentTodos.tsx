"use client";
import ListItem from "@/components/common/list/list-item/ListItem";
import { useListItems } from "@/hooks/useListItems";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ListTodoType } from "@/components/common/list/list-item/types";
import { useTodos } from "@/hooks/queries/todos";

export default function RecentTodos() {
  const { data, isLoading, isError } = useTodos();

  const recentTodos: ListTodoType[] = data?.todos
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    ?.slice(0, 4)
    ?.map((t) => ({
      id: t.id,
      label: t.title,
      checked: t.done,
      link: !!t.linkUrl,
      file: !!t.fileUrl,
      note: !!t.noteId,
    })) ?? [
    {
      id: 1,
      label: "test",
      checked: true,
      link: false,
      file: false,
      note: false,
    },
  ];
  const { items, onToggleChecked } = useListItems(recentTodos);

  return (
    <div className="w-full">
      <h3 className="mb-2.5 flex flex-wrap items-center justify-between pr-3.5 pl-2 text-base font-medium sm:text-sm lg:text-lg xl:text-base">
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
          href="/tasklist">
          모두 보기
          <ChevronRightIcon className="text-orange-250 ml-0.5 w-3.5 lg:w-5" />
        </Link>
      </h3>

      <div className="bg-orange-250 h-auto rounded-[28px] px-4 py-4.5 shadow-[0_10px_40px_0_rgba(255,158,89,0.4)] transition-all sm:p-3.75 lg:h-64 lg:rounded-[40px] lg:p-7.5 lg:hover:shadow-[0_10px_40px_0_rgba(255,158,89,0.4)]">
        {isLoading && (
          <p className="flex h-full w-full items-center justify-center text-base font-semibold text-white">
            로딩 중입니다
          </p>
        )}

        {isError && data === undefined && (
          <p className="flex h-full w-full items-center justify-center text-base font-semibold text-white">
            에러가 발생했습니다
          </p>
        )}

        {!data && (
          <p className="flex h-full w-full items-center justify-center text-base font-semibold text-white">
            로그인이 필요합니다
          </p>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <p className="flex h-full w-full items-center justify-center text-base font-semibold text-white">
            최근에 등록한 할 일이 없어요
          </p>
        )}
        <ListItem
          className="grid gap-0.5 lg:gap-1.5"
          items={items}
          onToggleChecked={onToggleChecked}
          variant="white"
        />
      </div>
    </div>
  );
}
