import ListItemButton from "../list-button/ListItemButton";
import { ListActionType, ListItemVariant } from "../list-item/listItem.types";
import { ACTION_ICON_MAP } from "./listItemActions.constants";

type ListItemActionsProps = {
  variant?: ListItemVariant;
  actions?: ListActionType[];
};

export default function ListItemActions({
  variant = "default",
  actions = [],
}: ListItemActionsProps) {
  if (!actions.length) return null;

  const iconActions = actions.filter((action) => action.type !== "more");

  const hasMore = actions.some((action) => action.type === "more");

  return (
    <div className="flex shrink-0 items-center gap-2">
      {/* ✅ link / file / note → 모바일 숨김 */}
      <div className="hidden gap-2 sm:flex">
        {iconActions.map((action) => {
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

      {/* ✅ 케밥 → 항상 보임 */}
      {hasMore && (
        <ListItemButton
          icon={ACTION_ICON_MAP.more.icon}
          className={ACTION_ICON_MAP.more.buttonClassName}
          variant={variant}
        />
      )}
    </div>
  );
}
