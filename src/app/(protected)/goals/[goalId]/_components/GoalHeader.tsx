"use client";

import Dropdown, { DropdownItem } from "@/components/common/dropdown/Dropdown";
import ConfirmModal from "@/components/common/popup-modal/ConfirmModal";
import { useDropdown } from "@/hooks/useDropdown";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type GoalHeaderProps = {
  title: string;
  onDeleteTodo?: (id: number) => void;
};

export default function GoalHeader({ title, onDeleteTodo }: GoalHeaderProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const {
    open: dropdownOpen,
    toggle: toggleDropdown,
    close: closeDropdown,
    dropdownRef,
    triggerRef,
  } = useDropdown();

  const dropdownItems: DropdownItem[] = [
    { text: "수정하기", onClick: () => closeDropdown },
    {
      text: "삭제하기",
      onClick: () => {
        toggleDropdown;
        setConfirmOpen(true);
      },
    },
  ];

  return (
    <>
      <div className="relative mb-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-4 sm:rounded-3xl sm:px-6 sm:py-6 md:px-3 md:py-8.75 lg:mb-0 xl:rounded-4xl xl:px-10 xl:py-15">
        <img
          src="/icons/icon-goal.svg"
          alt="목표 아이콘"
          className="h-8 w-8 xl:h-10 xl:w-10"
        />

        <h3 className="truncate text-base font-semibold break-keep sm:text-xl xl:text-2xl">
          {title}
        </h3>
        <button
          ref={triggerRef}
          className="ml-auto cursor-pointer"
          onClick={toggleDropdown}>
          <EllipsisVerticalIcon className="h-6 w-6 text-gray-400" />
        </button>
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-2/3 right-0 z-50 mt-2">
            <Dropdown items={dropdownItems} />
          </div>
        )}
      </div>

      {/* 삭제 모달 */}
      <div className="z-1000">
        <ConfirmModal
          isOpen={confirmOpen}
          title="정말 삭제하시겠어요?"
          message="삭제된 목표는 복구할 수 없습니다."
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            onDeleteTodo?.(1); // 잠시 넣어둔 것
          }}
        />
      </div>
    </>
  );
}
