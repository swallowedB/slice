"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import Dropdown, { DropdownItem } from "@/components/common/dropdown";
import { useDropdown } from "@/hooks/useDropdown";
import { formatDate } from "@/utils/date";
import NoteTitleView from "./NoteTitleView";
import Badge from "./Badge";

interface NoteItemProps {
  id: number;
  title: string;
  todo: {
    id: number;
    title: string;
    done: boolean;
  };
  updatedAt: string;
  onEditNote: (id: number) => void;
  onDeleteNote: (id: number) => void;
}

export default function NoteItem({
  id,
  title,
  todo,
  updatedAt,
  onEditNote,
  onDeleteNote,
}: NoteItemProps) {
  const { open, toggle, close, dropdownRef, triggerRef } =
    useDropdown<HTMLButtonElement>();

  const dropdownItems: DropdownItem[] = [
    {
      text: "수정하기",
      onClick: () => {
        close();
        onEditNote(id);
      },
    },
    {
      text: "삭제하기",
      onClick: () => {
        close();
        onDeleteNote(id);
      },
    },
  ];

  return (
    <Link href={`/notes/${id}`}>
      <article
        className={clsx(
          "relative cursor-pointer rounded-2xl bg-white p-4 shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:px-8 sm:py-7",
          open && "z-10",
        )}>
        <header className="mb-2 flex items-center justify-between border-b border-b-gray-100 pb-2 sm:mb-3.5 sm:pb-4 lg:mb-4 lg:pb-5">
          <NoteTitleView
            title={title}
            className="truncate text-sm sm:text-lg lg:text-xl"
          />
          <button
            type="button"
            ref={triggerRef}
            aria-label="노트 옵션 메뉴"
            aria-expanded={open}
            onClick={toggle}
            className="ml-2 h-6 w-6 shrink-0 cursor-pointer text-gray-400">
            <EllipsisVerticalIcon className="h-6 w-6" />
          </button>
        </header>
        <footer className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <Badge isDone={todo.done} />
            <p className="flex-1 truncate text-xs font-normal text-gray-700 sm:text-sm">
              {todo.title}
            </p>
          </div>
          <time
            dateTime={updatedAt}
            className="ml-2 shrink-0 text-xs font-normal text-gray-400">
            {formatDate(updatedAt)}
          </time>
        </footer>
        {open && (
          <div
            ref={dropdownRef}
            className="absolute top-11 right-6 z-100">
            <Dropdown items={dropdownItems} />
          </div>
        )}
      </article>
    </Link>
  );
}
