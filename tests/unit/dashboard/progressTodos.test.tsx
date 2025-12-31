import ProgressTodos from "@/app/(protected)/dashboard/_components/todos/progress/ProgressTodos";
import { renderWithQueryClient } from "../../test-utils";
import { screen } from "@testing-library/react";
import { useProgressTodosSuspense } from "@/hooks/queries/todos/useProgressTodosSuspense";

jest.mock("@/hooks/queries/todos/useProgressTodosSuspense");
const mockedUseProgress = useProgressTodosSuspense as jest.Mock;

jest.mock("react-error-boundary", () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useErrorBoundary: () => ({
    showBoundary: jest.fn(),
  }),
}));

describe("ProgressTodos", () => {
  it("로딩 상태에서도 ProgressTodos가 정상적으로 렌더링된다", () => {
    mockedUseProgress.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    renderWithQueryClient(<ProgressTodos />);

    expect(
      screen.getByRole("heading", { name: /내 진행 상황/ }),
    ).toBeInTheDocument();
  });
});
