"use client";

import { useState } from "react";
import clsx from "clsx";
import Checkbox from "../../checkbox/Checkbox";
import ListItemActions from "../list-item-actions/ListItemActions";
import {
  ListActionType,
  ListItemType,
  ListItemVariant,
} from "./listItem.types";

type Props = {
  item: ListItemType;
  onChange: (id: number) => void;
  variant: ListItemVariant;
};

const ListItemRow = ({ item, onChange, variant }: Props) => {
  const [showActions, setShowActions] = useState(false);

  const getTextColor = (checked: boolean, variant: ListItemVariant) => {
    if (checked) return "text-gray-600";
    if (variant === "white") return "text-white";
    return "text-gray-700";
  };

  const getActionsFromItem = (item: ListItemType): ListActionType[] => {
    const actions: ListActionType[] = [];

    if (item.link) actions.push({ type: "link" });
    if (item.file) actions.push({ type: "file" });
    if (item.note) actions.push({ type: "note" });

    if (item.link || item.file || item.note) {
      actions.push({ type: "more" });
    }

    return actions;
  };

  const textColor = getTextColor(item.checked, variant);

  const handleTextClick = () => {
    // 모바일에서만 케밥 토글하고 싶으면 여기서 분기 태워도 됨
    setShowActions((prev) => !prev);
  };

  return (
    <li className="group flex w-full items-center justify-between rounded-2xl p-2.5 transition-all hover:bg-orange-400/20">
      {/* 왼쪽: 체크박스 + 텍스트 */}
      <div className="flex min-w-0 flex-1 items-center gap-2.5 pr-10">
        {/* 체크박스: 오직 체크만 담당 */}
        <Checkbox
          id={`checkbox-${item.id}`}
          checked={item.checked}
          onChange={() => onChange(item.id)}
          variant={variant}
        />

        {/* 텍스트: 모바일에서 케밥 토글 담당 */}
        <button
          type="button"
          className="min-w-0 flex-1 text-left md:pointer-events-none"
          onClick={handleTextClick}>
          <span
            className={clsx(
              "flex-1 truncate text-sm transition-colors group-hover:font-semibold group-hover:text-orange-400 sm:text-base",
              textColor,
            )}>
            {item.label}
          </span>
        </button>
      </div>

      {/* 오른쪽: 액션 영역 (케밥 포함) */}
      <ListItemActions
        variant={variant}
        actions={getActionsFromItem(item)}
        isVisible={showActions}
      />
    </li>
  );
};

export default ListItemRow;
