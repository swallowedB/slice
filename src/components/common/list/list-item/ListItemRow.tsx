import clsx from "clsx";
import Checkbox from "../../checkbox/Checkbox";
import ListItemActions from "../list-item-actions/ListItemActions";
import { ListTodoType } from "./types";
import { ListActionType, ListItemVariant } from "../list-item-actions/types";

type Props = {
  item: ListTodoType;
  onToggleChecked: (id: number, checked: boolean) => void;
  variant: ListItemVariant;
};

export default function ListItemRow({ item, onToggleChecked, variant }: Props) {
  const getTextColor = (checked: boolean, variant: ListItemVariant) => {
    if (checked) return "text-gray-600";
    if (variant === "white") return "text-white";
    return "text-gray-700";
  };

  const getActionsFromItem = (item: ListTodoType): ListActionType[] => {
    const actions: ListActionType[] = [];

    if (item.link) actions.push({ type: "link" });
    if (item.file) actions.push({ type: "file" });
    if (item.note) actions.push({ type: "note" });

    actions.push({ type: "more" });

    return actions;
  };

  const textColor = getTextColor(item.checked, variant);

  return (
    <li className="group grid grid-cols-[minmax(0,1fr)_auto] items-center rounded-2xl p-2.5">
      <div className="min-w-0 flex-1 overflow-hidden">
        <div>
          <label
            htmlFor={`checkbox-${item.id}`}
            className="flex min-w-0 items-center gap-2.5">
            <Checkbox
              id={item.id}
              checked={item.checked}
              onToggleChecked={(checked) => {
                onToggleChecked(item.id, checked);
              }}
              variant={variant}
            />
            <span
              id={`checkbox-${item.id}`}
              className={clsx(
                "min-w-0 flex-1 cursor-pointer truncate overflow-hidden text-sm whitespace-nowrap transition-colors group-hover:font-semibold group-hover:text-orange-400 sm:text-base",
                textColor,
              )}>
              {item.label}
            </span>
          </label>
        </div>
      </div>
      <ListItemActions
        id={item.id}
        todo={item.todo}
        variant={variant}
        actions={getActionsFromItem(item)}
      />
    </li>
  );
}
