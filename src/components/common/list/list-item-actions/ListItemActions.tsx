import ListItemButton from "../list-button/ListItemButton";
import { ListActionType, ListItemVariant } from "../list-item/listItem.types";
import { ACTION_ICON_MAP } from "./listItemActions.constants";

type ListItemActionsProps = {
  variant?: ListItemVariant;
  actions?: ListActionType[];
};

const ListItemActions = ({
  variant = "default",
  actions = [],
}: ListItemActionsProps) => {
  if (!actions.length) return null;

  return (
    <div className="flex shrink-0 items-center gap-2">
      {actions.map((action) => {
        const config = ACTION_ICON_MAP[action.type];

        return (
          <ListItemButton
            key={action.type}
            icon={config.icon}
            className={config.buttonClassName}
            variant={variant}
          />
        );
      })}
    </div>
  );
};

export default ListItemActions;
