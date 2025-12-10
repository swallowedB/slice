import RecentTodos from "@/app/(protected)/(dashboard)/_components/recent/RecentTodos";
import { renderWithQueryClient } from "../../test-utils";
import { screen } from "@testing-library/react";
import { useTodos } from "@/hooks/queries/todos";

jest.mock("@/hooks/queries/todos");
const mockedUseTodos = useTodos as jest.Mock;

describe("대시보드 최근 할 일 불러오기 컴포넌트 테스트입니다", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("로딩중 표시가 보인다", () => {
    mockedUseTodos.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    renderWithQueryClient(<RecentTodos />);

    expect(screen.getByText("로딩 중입니다")).toBeInTheDocument();
  });

  it("할 일이 있을 때 올바르게 렌더링 된다", () => {
    mockedUseTodos.mockReturnValue({
      data: {
        totalCount: 1,
        nextCursor: null,
        todos: [
          {
            id: 1,
            title: "오늘은 꼭 API를 연결해야지",
            done: false,
            linkUrl: "",
            fileUrl: "",
            noteId: null,
            userId: 1,
            teamId: "A",
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
        ],
      },
      isLoading: false,
      isError: false,
    });

    renderWithQueryClient(<RecentTodos />);

    expect(screen.getByText("오늘은 꼭 API를 연결해야지")).toBeInTheDocument();
  });

  it("에러가 발생시 에러 메시지가 보인다", () => {
    mockedUseTodos.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    renderWithQueryClient(<RecentTodos />);

    expect(screen.getByText("에러가 발생했습니다")).toBeInTheDocument();
  });

  it("등록된 할 일 이 없을 경우 등록된 할 일 없음 메시지가 보인다", () => {
    mockedUseTodos.mockReturnValue({
      data: {
        totalCount: 0,
        nextCursor: null,
        todos: [],
      },
      isLoading: false,
      isError: false,
    });

    renderWithQueryClient(<RecentTodos />);

    expect(
      screen.getByText("최근에 등록한 할 일이 없어요"),
    ).toBeInTheDocument();
  });

  it("최근 할 일이 4개까지 불러와지는지 확인해본다", () => {
    mockedUseTodos.mockReturnValue({
      data: {
        totalCount: 5,
        nextCursor: null,
        todos: [
          { id: 1, title: "작업 1", done: false, createdAt: "2024-01-01" },
          { id: 2, title: "작업 2", done: false, createdAt: "2024-01-02" },
          { id: 3, title: "작업 3", done: false, createdAt: "2024-01-03" },
          { id: 4, title: "작업 4", done: false, createdAt: "2024-01-04" },
          { id: 5, title: "작업 5", done: false, createdAt: "2024-01-05" },
        ],
      },
      isLoading: false,
      isError: false,
    });

    renderWithQueryClient(<RecentTodos />);

    expect(screen.queryByText("작업 1")).not.toBeInTheDocument();

    expect(screen.getByText("작업 2")).toBeInTheDocument();
    expect(screen.getByText("작업 3")).toBeInTheDocument();
    expect(screen.getByText("작업 4")).toBeInTheDocument();
    expect(screen.getByText("작업 5")).toBeInTheDocument();
  });
});
