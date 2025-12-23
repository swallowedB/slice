import { useLogout } from "@/hooks/queries/auth";
import { clearTokens } from "@/lib/tokenStorage";
import { act, renderHook } from "@testing-library/react";
import { createQueryClientWrapper } from "tests/test-utils";

type AuthStoreState = {
  clearUser: () => void;
};

const replaceMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
}));

jest.mock("@/lib/tokenStorage", () => ({
  clearTokens: jest.fn(),
}));

const clearUserMock = jest.fn();
jest.mock("@/store/useAuthStore", () => ({
  useAuthStore: function <T>(selector: (state: AuthStoreState) => T): T {
    return selector({ clearUser: clearUserMock });
  },
}));

describe("useLogout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("로그아웃 시 토큰/유저를 정리하고 auth 쿼리를 제거한 뒤 /login으로 이동한다", () => {
    const wrapper = createQueryClientWrapper();

    const { result } = renderHook(() => useLogout(), { wrapper });

    act(() => {
      result.current();
    });

    expect(clearTokens).toHaveBeenCalledTimes(1);
    expect(clearUserMock).toHaveBeenCalledTimes(1);
    expect(replaceMock).toHaveBeenCalledTimes(1);
    expect(replaceMock).toHaveBeenCalledWith("/login");
  });
});
