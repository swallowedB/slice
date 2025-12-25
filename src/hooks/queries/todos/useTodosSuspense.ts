import { getTodos } from "@/api/todo";
import { Todo, TodosResponse } from "@/api/types/todo";
import { useSuspenseQuery } from "@tanstack/react-query";
import todosQueryKeys from "./queryKeys";
import { ListTodoType } from "@/components/common/list/list-item/types";

export function useTodosSuspense() {
  const { data } = useSuspenseQuery<TodosResponse, Error, ListTodoType[]>({
    queryKey: todosQueryKeys.all,
    queryFn: getTodos,
    select: (data) =>
      data.todos.map((todo) => ({
        id: todo.id,
        label: todo.title,
        checked: todo.done,
        link: !!todo.linkUrl,
        file: !!todo.fileUrl,
        goal: todo.goal,
        note: Boolean(todo.noteId),
      })),
  });

  return data;
}
