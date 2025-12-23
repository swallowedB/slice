import ProgressTodos from "@/app/(protected)/dashboard/_components/todos/progress/ProgressTodos";
import { renderWithQueryClient } from "../../test-utils";
import { screen } from "@testing-library/react";
import { useProgressTodosQuery } from "@/hooks/queries/todos";

jest.mock("@/hooks/queries/todos/useProgressTodosQuery");
const mockedUseProgress = useProgressTodosQuery as jest.Mock;

it("로딩 상태일 때 스켈레톤이 렌더링된다", () => {
  mockedUseProgress.mockReturnValue({
    data: undefined,
    isLoading: true,
    isError: false,
  });

  renderWithQueryClient(<ProgressTodos />);

  expect(screen.getByRole("status")).toBeInTheDocument();
});
