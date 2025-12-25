import { Todo } from "@/api/types/todo";
import ListItemButton from "../../list-button/ListItemButton";
import { ACTION_ICON_MAP } from "../constants/listItemActions";
import { ACTION_ARIA_LABEL, ActionType, ListItemVariant } from "../types";
import { useRouter } from "next/navigation";

type Props = {
  todo?: Todo;
  actions: { type: ActionType }[];
  variant?: ListItemVariant;
};

export function ListItemIconActions({ todo, actions, variant }: Props) {
  const router = useRouter();

  const openLink = (linkUrl?: string) => {
    if (!linkUrl) return;
    const url = /^https?:\/\//i.test(linkUrl) ? linkUrl : `https://${linkUrl}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const downloadFileByUrl = (fileUrl?: string) => {
    if (!fileUrl) return;
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleAction = (type: ActionType) => {
    if (!todo) return;

    switch (type) {
      case "link":
        openLink(todo.linkUrl);
        break;
      case "file":
        downloadFileByUrl(todo.fileUrl);
        break;
      case "note":
        // router.push(`/notes/${note.id}`);
        router.push("/notes/881");
        break;
    }
  };

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
            onClick={() => handleAction(type)}
          />
        );
      })}
    </div>
  );
}
