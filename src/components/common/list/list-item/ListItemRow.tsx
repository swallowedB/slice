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

export default function ListItemRow({ item, onChange, variant }: Props) {
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

    actions.push({ type: "more" });

    return actions;
  };

  const textColor = getTextColor(item.checked, variant);

  return (
    <li className="group flex w-full items-center justify-between rounded-2xl p-2.5 transition-all hover:bg-orange-400/20">
      <div className="flex min-w-0 flex-1 items-center gap-2.5 pr-10">
        <label
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 pr-2 sm:pr-10"
          htmlFor={`checkbox-${item.id}`}>
          <Checkbox
            id={`checkbox-${item.id}`}
            checked={item.checked}
            onChange={() => onChange(item.id)}
            variant={variant}
          />
          <span
            id={`item-label-${item.id}`}
            className={clsx(
              "max-w-fit flex-1 truncate text-sm transition-colors group-hover:font-semibold group-hover:text-orange-400 sm:text-base",
              textColor,
            )}>
            {item.label}
          </span>
        </label>
      </div>

      <ListItemActions
        variant={variant}
        actions={getActionsFromItem(item)}
      />
    </li>
  );
}
