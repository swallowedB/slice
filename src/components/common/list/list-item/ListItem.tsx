"use client";
import { ListTodoType, ListItemVariant } from "./listItem.types";
import ListItemRow from "./ListItemRow";

type ListItemProps = {
  items: ListTodoType[];
  onDeleteTodo: (id: number) => void;
  onToggleChecked: (id: number) => void;
  variant?: ListItemVariant;
  className?: string;
};

export default function ListItem({
  items,
  onToggleChecked,
  onDeleteTodo,
  variant = "default",
  className = "",
}: ListItemProps) {
  return (
    <div className="w-full">
      <ul className={className}>
        {items.map((item) => (
          <ListItemRow
            key={item.id}
            item={item}
            onToggleChecked={onToggleChecked}
            variant={variant}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
