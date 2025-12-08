"use client";

import { useEffect, useRef, useState } from "react";
import ListItemButton from "../list-button/ListItemButton";
import Dropdown, { DropdownItem } from "../../dropdown/Dropdown";
import { ListActionType, ListItemVariant } from "../list-item/types";
import ConfirmModal from "../../popup-modal/ConfirmModal";
import { ACTION_ICON_MAP } from "./constants/listItemActions";

type ListItemActionsProps = {
  id: number;
  variant?: ListItemVariant;
  actions?: ListActionType[];
  onDeleteTodo?: (id: number) => void;
};

export default function ListItemActions({
  id,
  variant = "default",
  actions = [],
  onDeleteTodo,
}: ListItemActionsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // 외부 클릭 + ESC 닫기
  useEffect(() => {
    if (!dropdownOpen) return;

    const handleClose = (e: MouseEvent | KeyboardEvent) => {
      if ("key" in e && e.key === "Escape") {
        setDropdownOpen(false);
        return;
      }

      const target = e.target as Node;
      if (
        !dropdownRef.current?.contains(target) &&
        !kebabRef.current?.contains(target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClose);
    document.addEventListener("keydown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
      document.removeEventListener("keydown", handleClose);
    };
  }, [dropdownOpen]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const kebabRef = useRef<HTMLDivElement>(null);

  if (!actions.length) return null;

  const iconActions = actions.filter((a) => a.type !== "more");
  const hasMore = actions.some((a) => a.type === "more");

  const onToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const dropdownItems: DropdownItem[] = [
    { text: "노트 작성하기", onClick: () => setDropdownOpen(false) },
    { text: "수정하기", onClick: () => setDropdownOpen(false) },
    {
      text: "삭제하기",
      onClick: () => {
        setDropdownOpen(false);
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
          <div ref={kebabRef}>
            <ListItemButton
              icon={ACTION_ICON_MAP.more.icon}
              className={ACTION_ICON_MAP.more.buttonClassName}
              variant={variant}
              onClick={onToggleDropdown}
            />
          </div>
        )}

        {/* Dropdown */}
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full right-0 z-50 mt-2">
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
            onDeleteTodo?.(id);
          }}
        />
      </div>
    </>
  );
}
