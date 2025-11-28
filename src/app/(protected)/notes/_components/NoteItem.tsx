"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Badge from "./Badge";

interface NoteItemProps {
  id: number;
  title: string;
  goal: {
    id: number;
    title: string;
  };
  todo: {
    id: number;
    title: string;
    done: boolean;
  };
  updatedAt: string;
  createdAt: string;
  userId: number;
  teamId: string;
}

export default function NoteItem({
  id,
  title,
  goal,
  todo,
  updatedAt,
  createdAt,
  userId,
  teamId,
}: NoteItemProps) {
  return (
    <div className="transition-[box-shadow, transform] rounded-2xl bg-white p-4 shadow-sm duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:px-8 sm:py-7">
      <div className="mb-2 flex items-center justify-between border-b border-b-gray-100 pb-2 sm:mb-3.5 sm:pb-4 lg:mb-4 lg:pb-5">
        <div className="flex min-w-0 items-center gap-2">
          <img
            src="/icons/icon-note.svg"
            alt="노트 아이콘"
            className="h-8 w-8 lg:h-10 lg:w-10"
          />
          <div className="flex-1 truncate text-sm font-semibold sm:text-lg lg:text-xl">
            {title}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            console.log("버튼 눌림!");
          }}
          className="ml-2 h-6 w-6 shrink-0 cursor-pointer text-gray-400">
          <EllipsisVerticalIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <Badge isDone={todo.done} />
          <div className="flex-1 truncate text-xs font-normal text-gray-700 sm:text-sm">
            {todo.title}
          </div>
        </div>
        <div className="ml-2 shrink-0 text-xs font-normal text-gray-400">
          2025. 11. 23
        </div>
      </div>
    </div>
  );
}
