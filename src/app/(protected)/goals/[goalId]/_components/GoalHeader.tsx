"use client";

import Dropdown, { DropdownItem } from "@/components/common/dropdown/Dropdown";
import { useUpdateGoalMutation } from "@/hooks/queries/goals/useUpdateGoalMutation";
import { useGoalDetail } from "@/hooks/queries/goals/useGoalDetail";
import { useDropdown } from "@/hooks/useDropdown";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TextButton from "@/components/common/button/TextButton";

type GoalHeaderProps = {
  goalId: string;
};

export default function GoalHeader({ goalId }: GoalHeaderProps) {
  const numericGoalId = Number(goalId);

  const { data: goal } = useGoalDetail(numericGoalId);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  const { mutate: updateGoal } = useUpdateGoalMutation(numericGoalId);

  const {
    open: dropdownOpen,
    toggle: toggleDropdown,
    close: closeDropdown,
    dropdownRef,
    triggerRef,
  } = useDropdown();

  const dropdownItems: DropdownItem[] = [
    {
      text: "수정하기",
      onClick: () => {
        closeDropdown();
        setEditTitle(goal?.title ?? "");
        setIsEditing(true);
      },
    },
    {
      text: "삭제하기",
      onClick: () => {
        closeDropdown();
      },
    },
  ];

  const handleSave = () => {
    updateGoal(
      { title: editTitle },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  return (
    <div className="relative mb-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-4">
      <img
        src="/icons/icon-goal.svg"
        className="h-8 w-8"
      />

      {!isEditing ? (
        <h3 className="truncate text-base font-semibold">{goal?.title}</h3>
      ) : (
        <div className="flex w-full gap-2">
          <input
            className="w-[80%] rounded border p-2 sm:w-[90%]"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSave();
              }
            }}
          />
          <TextButton
            onClick={handleSave}
            className="w-[20%] sm:w-[10%]">
            수정 완료
          </TextButton>
        </div>
      )}

      <button
        ref={triggerRef}
        className="ml-auto"
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
  );
}
