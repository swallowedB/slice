"use client";

import { ListTodoType, ListItemVariant } from "./types";
import { motion } from "framer-motion";
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
    <div className={`w-full ${containerClassName}`}>
      <ul className={className}>
        {items.map((item) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}>
            <ListItemRow
              item={item}
              onToggleChecked={onToggleChecked}
              variant={variant}
            />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
