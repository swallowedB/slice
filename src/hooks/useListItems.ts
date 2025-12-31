import { useEffect, useState } from "react";
import { ListTodoType } from "@/components/common/list/list-item/types";

export function useListItems(initialItems: ListTodoType[]) {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [JSON.stringify(initialItems)]);
  const onToggleChecked = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  return { items, onToggleChecked };
}
