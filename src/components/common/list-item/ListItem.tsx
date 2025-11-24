import clsx from "clsx";
import { ListItemType, ListItemVariant } from "./listItem.types";
import Checkbox from "../checkbox/Checkbox";
import {
  DocumentIcon,
  DocumentTextIcon,
  LinkIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

type ListItemProps = {
  items: ListItemType[];
  onChange: (id: number) => void;
  variant?: ListItemVariant;
};

const ListItem = ({ items, onChange, variant = "default" }: ListItemProps) => {
  return (
    <div className="w-full">
      <ul>
        {items.map((item) => {
          const textColor = item.checked
            ? "text-gray-600"
            : variant === "white"
              ? "text-white"
              : "text-gray-700";
          const buttonBgColor =
            variant === "white" ? "bg-white/40" : "bg-orange-400/20";
          return (
            <li
              key={item.id}
              className="group flex w-full items-center justify-between rounded-2xl p-2.5 transition-all hover:bg-orange-400/20 hover:text-orange-400">
              <label
                className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 pr-10"
                htmlFor={`checkbox-${item.id}`}>
                <Checkbox
                  id={`checkbox-${item.id}`}
                  checked={item.checked}
                  onChange={() => onChange(item.id)}
                  variant={variant}
                />
                <span
                  className={clsx(
                    `flex-1 truncate text-sm transition-colors group-hover:font-semibold group-hover:text-orange-400 sm:text-base`,
                    textColor,
                  )}>
                  {item.label}
                </span>
              </label>
              <div className="flex shrink-0 gap-2 align-middle">
                <button
                  type="button"
                  className={clsx(
                    "h-6 w-6 cursor-pointer rounded-full",
                    buttonBgColor,
                  )}>
                  <DocumentIcon className="strokeWidth={3} m-auto h-3 w-3 text-orange-400" />
                </button>
                <button
                  type="button"
                  className={clsx(
                    "h-6 w-6 cursor-pointer rounded-full",
                    buttonBgColor,
                  )}>
                  <DocumentTextIcon className="strokeWidth={3} m-auto h-3 w-3 text-orange-400" />
                </button>
                <button
                  type="button"
                  className={clsx(
                    "h-6 w-6 cursor-pointer rounded-full bg-orange-400/20",
                    buttonBgColor,
                  )}>
                  <LinkIcon className="strokeWidth={3} m-auto h-3 w-3 text-orange-400" />
                </button>
                <button
                  type="button"
                  className={clsx(
                    "hidden h-6 w-6 scale-90 cursor-pointer items-center justify-center rounded-full bg-white transition-transform group-hover:scale-100",
                    {
                      "group-hover:flex": (variant = "white"),
                      "group-hover:scale-100": (variant = "default"),
                    },
                  )}>
                  <EllipsisVerticalIcon className="strokeWidth={3} m-auto h-3 w-3 text-orange-400" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListItem;
