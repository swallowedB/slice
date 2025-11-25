"use client";

import { ListItemType, ListItemVariant } from "./listItem.types";
import ListItemRow from "./ListItemRow";

type ListItemProps = {
  items: ListItemType[];
  onChange: (id: number) => void;
  variant?: ListItemVariant;
};

const ListItem = ({ items, onChange, variant = "default" }: ListItemProps) => {
  return (
    <div className="w-full">
      <ul>
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
};

export default ListItem;
