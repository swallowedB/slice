"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDropdown } from "@/hooks/useDropdown";
import { useDeleteMutation } from "@/hooks/queries/todos/useDeleteMutation";

import DropdownPortal from "@/components/common/dropdown/dropdown-portal/DropdownPortal";
import ConfirmModal from "../../popup-modal/ConfirmModal";
import ListItemButton from "../list-button/ListItemButton";
import TodoFormContent from "@/app/(protected)/_components/todo-modal/_components/TodoFormContent";

import { Todo } from "@/api/types/todo";
import { ListActionType, ListItemVariant } from "../list-item/types";
import { ACTION_ICON_MAP } from "./constants/listItemActions";

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
  const router = useRouter();

  const {
    open: dropdownOpen,
    toggle: toggleDropdown,
    close: closeDropdown,
    triggerRef,
  } = useDropdown<HTMLDivElement>();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const deleteTodo = useDeleteMutation();

  if (!actions.length) return null;

  const iconActions = actions.filter((a) => a.type !== "more");
  const hasMore = actions.some((a) => a.type === "more");

  const dropdownItems = [
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

  const onClickMore = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setAnchorRect(rect);
    toggleDropdown();
  };

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
              onClick={onClickMore}
            />
          </div>
        )}
      </div>

      {/* 드롭다운 포탈 */}
      {dropdownOpen && anchorRect && (
        <DropdownPortal
          anchorRect={anchorRect}
          items={dropdownItems}
          onClose={() => {
            setAnchorRect(null);
            closeDropdown();
          }}
        />
      )}

      {/* 수정 모달 */}
      {editOpen && (
        <TodoFormContent
          mode="edit"
          todoId={todo?.id}
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
    </>
  );
}
