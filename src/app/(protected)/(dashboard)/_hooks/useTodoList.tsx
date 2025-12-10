import { useTodosQuery } from "@/hooks/queries/todos";
import { ListTodoType } from "@/components/common/list/list-item/types";

export function useTodoList() {
  const { data, isLoading, isError } = useTodosQuery();

  const todos: ListTodoType[] =
    data?.todos?.map((t) => ({
      id: t.id,
      label: t.title,
      checked: t.done,
      link: !!t.linkUrl,
      file: !!t.fileUrl,
      note: !!t.noteId,
      goal: t.goal,
    })) ?? [];

  return { todos, isLoading, isError };
}
