import { getTodos } from "@/api/todo.api";
import { Todos } from "@/app/(protected)/_types";
import { ListTodoType } from "@/components/common/list/list-item/listItem.types";
import { useQuery } from "@tanstack/react-query";

export const useLatestTodos = () =>
  useQuery<Todos, Error, ListTodoType[]>({
    queryKey: ["latestTodos"],
    queryFn: getTodos,

    select: (data) =>
      data.todos
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 4)
        .map((t) => ({
          id: t.id,
          label: t.title,
          checked: t.done,
          link: !!t.linkUrl,
          file: !!t.fileUrl,
          note: !!t.noteId,
        })),

    enabled: true,
  });
