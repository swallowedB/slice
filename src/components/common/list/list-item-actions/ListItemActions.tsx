"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteMutation } from "@/hooks/queries/todos/useDeleteMutation";
import ListItemButton from "../list-button/ListItemButton";
import Dropdown, { DropdownItem } from "../../dropdown/Dropdown";
import { ListActionType, ListItemVariant } from "../list-item/types";
import ConfirmModal from "../../popup-modal/ConfirmModal";
import { Todo } from "@/api/types/todo";
import TodoFormContent from "@/app/(protected)/_components/todo-modal/_components/TodoFormContent";
import { ACTION_ICON_MAP } from "./constants/listItemActions";
import { useDropdown } from "@/hooks/useDropdown";

type ListItemActionsProps = {
  id: number;
  todo?: Todo;
  variant?: ListItemVariant;
  actions?: ListActionType[];
  onDeleteTodo?: (id: number) => void;
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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const deleteTodo = useDeleteMutation();

  if (!actions.length) return null;

  const iconActions = actions.filter((a) => a.type !== "more");
  const hasMore = actions.some((a) => a.type === "more");

  const dropdownItems: DropdownItem[] = [
    {
      text: "노트 작성하기",
      onClick: () => {
        closeDropdown();
        router.push("/notes/new");
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
        toggleDropdown();
        setConfirmOpen(true);
      },
    },
  ];

  return (
    <>
      <div className="relative flex items-center gap-2">
        {/* Desktop 아이콘 */}
        <div className="hidden gap-2 md:flex">
          {iconActions.map(({ type }) => {
            const config = ACTION_ICON_MAP[type];
            return (
              <ListItemButton
                key={type}
                icon={config.icon}
                className={config.buttonClassName}
                variant={variant}
              />
            );
          })}
        </div>

        {/* Kebab 버튼 */}
        {hasMore && (
          <div ref={triggerRef}>
            <ListItemButton
              icon={ACTION_ICON_MAP.more.icon}
              className={ACTION_ICON_MAP.more.buttonClassName}
              variant={variant}
              onClick={toggleDropdown}
            />
          </div>
        )}

        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full right-0 z-50 mt-2">
            <Dropdown items={dropdownItems} />
          </div>
        )}
      </div>
      <div className="z-1000">
        {editOpen && (
          <TodoFormContent
            mode="edit"
            todo={todo}
            onClose={() => setEditOpen(false)}
          />
        )}
        {/* 삭제 모달 */}
        <ConfirmModal
          isOpen={confirmOpen}
          title="정말 삭제하시겠어요?"
          message="삭제된 목표는 복구할 수 없습니다."
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            deleteTodo.mutate({ id });
          }}
        />
      </div>
    </>
  );
}
