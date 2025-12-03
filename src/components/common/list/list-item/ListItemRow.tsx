import clsx from "clsx";
import Checkbox from "../../checkbox/Checkbox";
import ListItemActions from "../list-item-actions/ListItemActions";
import {
  ListActionType,
  ListTodoType,
  ListItemVariant,
} from "./listItem.types";

type Props = {
  item: ListTodoType;
  onToggleChecked: (id: number) => void;
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
    <li className="group flex items-center justify-between rounded-2xl p-2.5 transition-all">
      <div className="grid max-w-fit min-w-0 flex-1 items-center gap-2.5 overflow-hidden">
        <label
          className="flex min-w-0 flex-1 items-center gap-2.5 pr-2 sm:pr-0 md:pr-10"
          htmlFor={`${item.id}`}>
          <Checkbox
            id={`${item.id}`}
            checked={item.checked}
            onChange={() => onToggleChecked(item.id)}
            variant={variant}
          />
          <span
            id={`item-label-${item.id}`}
            className={clsx(
              "min-w-0 flex-1 truncate overflow-hidden text-sm whitespace-nowrap transition-colors group-hover:font-semibold group-hover:text-orange-400 sm:text-base",
              textColor,
            )}>
            {item.label}
          </span>
        </label>
      </div>
      <div className="flex max-w-fit shrink-0 items-center gap-2">
        <ListItemActions
          id={item.id}
          variant={variant}
          actions={getActionsFromItem(item)}
        />
      </div>
    </li>
  );
}
