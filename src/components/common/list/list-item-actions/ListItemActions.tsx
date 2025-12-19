"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useDeleteMutation } from "@/hooks/queries/todos/useDeleteMutation";
import { useDropdown } from "@/hooks/useDropdown";

import Dropdown, { DropdownItem } from "../../dropdown/Dropdown";

import { Todo } from "@/api/types/todo";
import { ActionType, ListActionType, ListItemVariant } from "./types";
import { KebabActionButton } from "./_components/kebabActionButton";
import { ListItemActionModals } from "./_components/ListItemActionModals";
import { ListItemIconActions } from "./_components/ListItemActionIcons";

type ListItemActionsProps = {
  id: number;
  todo?: Todo;
  variant?: ListItemVariant;
  actions?: ListActionType[];
};

export default function ListItemActions({
  id,
  todo,
  variant = "default",
  actions = [],
}: ListItemActionsProps) {
  const {
    open: dropdownOpen,
    toggle: toggleDropdown,
    close: closeDropdown,
    dropdownRef,
    triggerRef,
  } = useDropdown<HTMLDivElement>();

  const router = useRouter();
  const deleteTodo = useDeleteMutation();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  if (!actions.length) return null;

  const iconActions = actions.filter(
    (a): a is { type: ActionType } => a.type !== "more",
  );

  const hasMore = actions.some((a) => a.type === "more");

  const dropdownItems: DropdownItem[] = [
    {
      text: "노트 작성하기",
      onClick: () => {
        closeDropdown();
        router.push(`/notes/new?todoId=${id}`);
      },
    },
    {
      text: "수정하기",
      onClick: () => {
        closeDropdown();
        setEditOpen(true);
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

  return (
    <>
      <div className="relative ml-auto flex shrink-0 items-center justify-end">
        {/* 아이콘 액션 */}
        <ListItemIconActions
          todo={todo}
          actions={iconActions}
          variant={variant}
        />

        {/* 케밥 버튼 */}
        {hasMore && (
          <KebabActionButton
            variant={variant}
            toggleDropdown={toggleDropdown}
            triggerRef={triggerRef}
          />
        )}

        {/* 드롭다운 */}
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full right-0 z-50 mt-2">
            <Dropdown items={dropdownItems} />
          </div>
        )}
      </div>

      {/* 모달들 */}
      <ListItemActionModals
        todo={todo}
        editOpen={editOpen}
        confirmOpen={confirmOpen}
        onCloseEdit={() => setEditOpen(false)}
        onCloseConfirm={() => setConfirmOpen(false)}
        onConfirmDelete={() => deleteTodo.mutate({ id })}
      />
    </>
  );
}
