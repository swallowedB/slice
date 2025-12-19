"use client";
import { ListTodoType } from "./types";
import ListItemRow from "./ListItemRow";
import { ListItemVariant } from "../list-item-actions/types";

type ListItemProps = {
  items: ListTodoType[];
  onToggleChecked: (id: number, checked: boolean) => void;
  variant?: ListItemVariant;
  className?: string;
  containerClassName?: string;
};

export default function ListItem({
  items,
  onToggleChecked,
  variant = "default",
  className = "",
  containerClassName = "",
}: ListItemProps) {
  return (
    <div
      className={`w-full overflow-x-hidden overflow-y-auto ${containerClassName}`}>
      <ul className={className}>
        {items.map((item) => (
          <ListItemRow
            key={item.id}
            item={item}
            onToggleChecked={onToggleChecked}
            variant={variant}
          />
        ))}
      </ul>
    </div>
  );
}
