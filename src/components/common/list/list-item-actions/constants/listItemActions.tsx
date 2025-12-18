import {
  LinkIcon,
  DocumentIcon,
  DocumentTextIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { ListActionType } from "../types";

const BASE_ICON_CLASS = "h-3 w-3 text-orange-400";

export const ACTION_ICON_MAP: Record<
  ListActionType["type"],
  {
    icon: React.ReactNode;
    buttonClassName?: string;
  }
> = {
  link: {
    icon: <LinkIcon className={BASE_ICON_CLASS} />,
  },
  file: {
    icon: <DocumentIcon className={BASE_ICON_CLASS} />,
  },
  note: {
    icon: <DocumentTextIcon className={BASE_ICON_CLASS} />,
  },
  more: {
    icon: <EllipsisVerticalIcon className={BASE_ICON_CLASS} />,
    buttonClassName: "bg-white cursor-pointer ",
  },
};
