"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Badge from "./Badge";
import { useEffect, useRef, useState } from "react";
import Dropdown from "@/components/common/dropdown/Dropdown";
import clsx from "clsx";

interface NoteItemProps {
  id: number;
  title: string;
  todo: {
    id: number;
    title: string;
    done: boolean;
  };
  updatedAt: string;
  onClickNote: (id: number) => void;
  onEditNote: (id: number) => void;
  onDeleteNote: (id: number) => void;
}

export default function NoteItem({
  id,
  title,
  todo,
  updatedAt,
  onClickNote,
  onEditNote,
  onDeleteNote,
}: NoteItemProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const kebabButtonRef = useRef<HTMLButtonElement>(null);

  const handleNoteClick = () => {
    if (isDropdownOpen) return;
    onClickNote(id);
  };

  const handleKebabButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (kebabButtonRef.current && kebabButtonRef.current.contains(target)) {
        return;
      }

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  return (
    <article
      onClick={handleNoteClick}
      className={clsx(
        "relative cursor-pointer rounded-2xl bg-white p-4 shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:px-8 sm:py-7",
        isDropdownOpen && "z-10",
      )}>
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
          ref={kebabButtonRef}
          aria-label="노트 옵션 메뉴"
          aria-expanded={isDropdownOpen}
          onClick={handleKebabButtonClick}
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

      {/* TODO: dropdown 이벤트 핸들러 */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-11 right-6 z-100">
          <Dropdown
            items={["수정하기", "삭제하기"]}
            variant="menu"
          />
        </div>
      )}
    </article>
  );
}
