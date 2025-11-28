"use client";
import { ListItemType, ListItemVariant } from "./listItem.types";
import ListItemRow from "./ListItemRow";

type ListItemProps = {
  items: ListItemType[];
  onChange: (id: number) => void;
  variant?: ListItemVariant;
  className?: string;
};

export default function ListItem({
  items,
  onChange,
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
            onChange={onChange}
            variant={variant}
          />
        ))}
      </ul>
    </div>
  );
}
