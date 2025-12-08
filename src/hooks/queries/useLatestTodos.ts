import { Todos } from "@/app/(protected)/_types";
import { ListTodoType } from "@/components/common/list/list-item/listItem.types";
import { useQuery } from "@tanstack/react-query";

export const mockTodos: Todos = {
  totalcount: 4,
  nextCursor: 0,
  todos: [
    {
      id: 1,
      title: "Next.js 구조 리팩토링",
      done: false,
      linkUrl: "",
      fileUrl: "",
      noteId: 111,
      goal: { id: 10, title: "프론트 취업하기" },
      userId: 999,
      teamId: "team-001",
      createdAt: "2025-01-01T10:00:00.000Z",
      updatedAt: "2025-01-01T10:00:00.000Z",
    },
    {
      id: 2,
      title: "React Query 정복",
      done: false,
      linkUrl: "",
      fileUrl: "",
      noteId: 112,
      goal: { id: 10, title: "프론트 취업하기" },
      userId: 999,
      teamId: "team-001",
      createdAt: "2025-01-02T10:00:00.000Z",
      updatedAt: "2025-01-02T10:00:00.000Z",
    },
    {
      id: 3,
      title: " 타입스크립트 한 번에 끝내기",
      done: true,
      linkUrl: "",
      fileUrl: "",
      noteId: 113,
      goal: { id: 10, title: "프론트 취업하기" },
      userId: 999,
      teamId: "team-001",
      createdAt: "2025-01-03T10:00:00.000Z",
      updatedAt: "2025-01-03T10:00:00.000Z",
    },
    {
      id: 4,
      title: "Tailwind로 개쩌는 UI 만들기",
      done: true,
      linkUrl: "",
      fileUrl: "",
      noteId: 114,
      goal: { id: 10, title: "프론트 취업하기" },
      userId: 999,
      teamId: "team-001",
      createdAt: "2025-01-04T10:00:00.000Z",
      updatedAt: "2025-01-04T10:00:00.000Z",
    },
  ],
};

const mockFetchTodos = async (): Promise<Todos> => {
  await new Promise((r) => setTimeout(r, 500));
  return mockTodos;
};

export const useLatestTodos = (teamId: string) =>
  useQuery<Todos, Error, ListTodoType[]>({
    queryKey: ["latestTodos", teamId],
    queryFn: mockFetchTodos,

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
