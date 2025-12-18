import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { ListItemVariant } from "../types";
import ListItemButton from "../../list-button/ListItemButton";
import { ACTION_ICON_MAP } from "../constants/listItemActions";

export function KebabActionButton({
  variant,
  toggleDropdown,
  triggerRef,
}: {
  variant?: ListItemVariant;
  toggleDropdown: () => void;
  triggerRef: React.Ref<HTMLDivElement>;
}) {
  return (
    <div ref={triggerRef}>
      <ListItemButton
        icon={ACTION_ICON_MAP.more.icon}
        className={ACTION_ICON_MAP.more.buttonClassName}
        variant={variant}
        ariaLabel="더보기"
        onClick={toggleDropdown}
      />
    </div>
  );
}
