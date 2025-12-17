import ProgressTodos from "@/app/(protected)/(dashboard)/_components/todos/progress/ProgressTodos";
import { renderWithQueryClient } from "../../test-utils";
import { screen } from "@testing-library/react";
import { useProgressTodosQuery } from "@/hooks/queries/todos";

jest.mock("@/hooks/queries/todos/useProgressTodosQuery");
const mockedUseProgress = useProgressTodosQuery as jest.Mock;

it("로딩 상태일 때 로딩 문구가 보인다", () => {
  mockedUseProgress.mockReturnValue({
    data: undefined,
    isLoading: true,
    isError: false,
  });

  renderWithQueryClient(<ProgressTodos />);

  expect(screen.getByText("로딩 중입니다")).toBeInTheDocument();
});
