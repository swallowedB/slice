import clsx from "clsx";
import ListItemButton from "../list-button/ListItemButton";
import { ListActionType, ListItemVariant } from "../list-item/listItem.types";
import { ACTION_ICON_MAP } from "./listItemActions.constants";

type ListItemActionsProps = {
  variant?: ListItemVariant;
  actions?: ListActionType[];
  isVisible?: boolean;
};

const ListItemActions = ({
  variant = "default",
  actions = [],
  isVisible = false,
}: ListItemActionsProps) => {
  if (!actions.length) return null;

  return (
    <div className="flex shrink-0 gap-2">
      {actions.map((action) => {
        const config = ACTION_ICON_MAP[action.type];

        const isMore = action.type === "more";

        const buttonClass = clsx(
          config.buttonClassName,
          isMore &&
            clsx(
              "hidden",
              "group-hover:flex",
              isVisible ? "flex" : "hidden group-hover:flex",
            ),
        );

        return (
          <ListItemButton
            key={action.type}
            icon={config.icon}
            className={buttonClass}
            variant={variant}
          />
        );
      })}
    </div>
  );
};

export default ListItemActions;
