"use client";
import { ListTodoType, ListItemVariant } from "./types";
import ListItemRow from "./ListItemRow";

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
    <div className={`w-full overflow-y-auto ${containerClassName}`}>
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
