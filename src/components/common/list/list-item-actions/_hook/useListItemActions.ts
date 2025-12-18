import { useRouter } from "next/navigation";
import { Todo } from "@/api/types/todo";
import { ActionType } from "../../list-item/types";

export function useListItemActions(todo?: Todo) {
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
        router.push(`/notes/new?todoId=${todo.id}`);
        break;
    }
  };

  return { handleAction };
}
