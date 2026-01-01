"use client";

import Dropdown, { DropdownItem } from "@/components/common/dropdown/Dropdown";
import { useUpdateGoalMutation } from "@/hooks/queries/goals/useUpdateGoalMutation";
import { useGoalDetail } from "@/hooks/queries/goals/useGoalDetail";
import { useDropdown } from "@/hooks/useDropdown";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TextButton from "@/components/common/button/TextButton";
import { useDeleteGoalMutation } from "@/hooks/queries/goals/useDeleteGoalMutation";
import ConfirmModal from "@/components/common/popup-modal/ConfirmModal";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import BaseInput from "@/components/common/input/base-input/BaseInput";

type GoalHeaderProps = {
  goalId: string;
};

export default function GoalHeader({ goalId }: GoalHeaderProps) {
  const numericGoalId = Number(goalId);
  const router = useRouter();

  const { data: goal } = useGoalDetail(numericGoalId);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  const { mutate: updateGoal } = useUpdateGoalMutation(numericGoalId);
  const { mutate: deleteGoal } = useDeleteGoalMutation();
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
        setConfirmOpen(true);
      },
    },
  ];

  const handleSave = () => {
    updateGoal(
      { title: editTitle },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("수정되었습니다");
        },
      },
    );
  };

  const handleCancelEdit = () => {
    setEditTitle("");
    setIsEditing(false);
  };

  const handleConfim = () => {
    deleteGoal(numericGoalId, {
      onSuccess: () => {
        setConfirmOpen(false);
        toast.success("삭제되었습니다");
        router.replace("/dashboard");
      },
    });
  };
  return (
    <div className="relative mb-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-4 lg:mb-0">
      <img
        src="/icons/icon-goal.svg"
        className="h-8 w-8"
      />

      {!isEditing ? (
        <h3 className="truncate text-base font-semibold">{goal?.title}</h3>
      ) : (
        <div className="flex w-full gap-2">
          <BaseInput
            id="goal-title-edit"
            className="w-[70%] sm:w-[80%]"
            value={editTitle}
            type="text"
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="수정할 목표를 적어주세요."
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
            수정
          </TextButton>
          <TextButton
            onClick={handleCancelEdit}
            className="w-[20%] text-black sm:w-[10%]">
            취소
          </TextButton>
        </div>
      )}

      <button
        ref={triggerRef}
        className="ml-auto cursor-pointer"
        onClick={toggleDropdown}
        aria-label="goal-options">
        <EllipsisVerticalIcon className="h-6 w-6 text-gray-400" />
      </button>

      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-2/3 right-0 z-50 mt-2">
          <Dropdown items={dropdownItems} />
        </div>
      )}

      <div className="z-1000">
        <ConfirmModal
          isOpen={confirmOpen}
          title="정말 삭제하시겠어요?"
          message="삭제된 목표는 복구할 수 없습니다."
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfim}
        />
      </div>
    </div>
  );
}
