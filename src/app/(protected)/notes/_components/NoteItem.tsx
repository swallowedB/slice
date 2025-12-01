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

export default function NoteItem({ title, todo, updatedAt }: NoteItemProps) {
  return (
    <article className="transition-[box-shadow, transform] rounded-2xl bg-white p-4 shadow-sm duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:px-8 sm:py-7">
      <header className="mb-2 flex items-center justify-between border-b border-b-gray-100 pb-2 sm:mb-3.5 sm:pb-4 lg:mb-4 lg:pb-5">
        <h3 className="flex min-w-0 items-center gap-2">
          <img
            src="/icons/icon-note.svg"
            alt="노트 아이콘"
            className="h-8 w-8 lg:h-10 lg:w-10"
          />
          <span className="flex-1 truncate text-sm font-semibold sm:text-lg lg:text-xl">
            {title}
          </span>
        </h3>
        <button
          type="button"
          aria-label="노트 옵션 메뉴"
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
          2025. 11. 23
        </time>
      </footer>
    </article>
  );
}
