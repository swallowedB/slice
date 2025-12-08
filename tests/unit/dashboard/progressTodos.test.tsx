import ProgressTodos from "@/app/(protected)/(dashboard)/_components/progress/ProgressTodos";
import { useProgressTodos } from "@/hooks/queries/useProgressTodos";
import { renderWithQueryClient } from "../../test-utils";
import { screen } from "@testing-library/react";

jest.mock("@/hooks/queries/useProgressTodos");
const mockedUseProgress = useProgressTodos as jest.Mock;

describe("대시보드 내 진행 상황 퍼센트 테스트입니다", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("로딩중 표시가 보인다", () => {
    mockedUseProgress.mockReturnValue({
      data: {
        progress: undefined,
      },
      isLoading: true,
      isError: false,
    });

    renderWithQueryClient(<ProgressTodos />);

    expect(screen.getByText("로딩 중입니다")).toBeInTheDocument();
  });

  it("에러가 발생시 에러 메시지가 보인다", () => {
    mockedUseProgress.mockReturnValue({
      data: {
        progress: undefined,
      },
      isLoading: false,
      isError: true,
    });

    renderWithQueryClient(<ProgressTodos />);

    expect(screen.getByText("데이터를 불러오지 못했어요")).toBeInTheDocument();
  });

  it("진행 상황이 0%일 때를 확인해본다", () => {
    mockedUseProgress.mockReturnValue({
      data: { progress: 0 },
      isLoading: false,
      isError: false,
    });

    renderWithQueryClient(<ProgressTodos />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });
  it("진행 상황이 0이상일 때를 확인해본다", () => {
    mockedUseProgress.mockReturnValue({
      data: { progress: 64 },
      isLoading: false,
      isError: false,
    });

    renderWithQueryClient(<ProgressTodos />);

    expect(screen.getByText("64")).toBeInTheDocument();
  });
});
