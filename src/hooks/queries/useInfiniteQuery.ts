import { useInfiniteQuery } from "@tanstack/react-query";
import { Todos } from "@/app/(protected)/_types";
import { ListTodoType } from "@/components/common/list/list-item/listItem.types";
import { mockTodos } from "./useLatestTodos"; // import 잊지말기!

export const useInfiniteTodos = (teamId: string) =>
  useInfiniteQuery<Todos, Error, ListTodoType[]>({
    queryKey: ["todos", teamId],
    enabled: !!teamId,

    initialPageParam: 0, // ← 이것 때문에 에러 남!!

    queryFn: async ({ pageParam = 0 }) => {
      await new Promise((r) => setTimeout(r, 500)); // mock 딜레이
      return mockTodos; // 나중에 API로 교체
    },

    getNextPageParam: (lastPage) => lastPage.nextCursor,

    select: (data) =>
      data.pages.flatMap((page) =>
        page.todos.map((t) => ({
          id: t.id,
          label: t.title,
          checked: t.done,
          link: !!t.linkUrl,
          file: !!t.fileUrl,
          note: !!t.noteId,
        })),
      ),
  });
