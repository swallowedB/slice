import { Todo } from "@/api/types/todo";
import ListItemButton from "../../list-button/ListItemButton";
import { ACTION_ICON_MAP } from "../constants/listItemActions";
import { ACTION_ARIA_LABEL, ActionType, ListItemVariant } from "../types";
import { useListItemActions } from "../_hook/useListItemActions";

type Props = {
  todo?: Todo;
  actions: { type: ActionType }[];
  variant?: ListItemVariant;
};

export function ListItemIconActions({ todo, actions, variant }: Props) {
  const { handleAction } = useListItemActions(todo);
  return (
    <div className="mr-2 hidden gap-2 md:flex">
      {actions.map(({ type }) => {
        const action = ACTION_ICON_MAP[type];

        return (
          <ListItemButton
            key={type}
            icon={action.icon}
            variant={variant}
            ariaLabel={ACTION_ARIA_LABEL[type]}
            onClick={() => {
              handleAction(type);
            }}
          />
        );
      })}
    </div>
  );
}
