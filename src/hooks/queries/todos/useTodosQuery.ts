import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/api/todo";
import todosQueryKeys from "./queryKeys";
import { TodosResponse } from "@/api/types/todo";
import { TodosQueryResult } from "./types";

export function useTodosQuery() {
  return useQuery<TodosResponse, Error, TodosQueryResult>({
    queryKey: todosQueryKeys.list(),
    queryFn: getTodos,
    select: (data) => ({
      todos: data.todos.map((todo) => ({
        id: todo.id,
        label: todo.title,
        checked: todo.done,
        link: !!todo.linkUrl,
        file: !!todo.fileUrl,
        goal: todo.goal,
        note: Boolean(todo.noteId),
        todo,
      })),
      totalCount: data.totalCount,
    }),
  });
}
