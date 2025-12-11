import { login } from "@/api/auth";
import { setTokens } from "@/lib/tokenStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "../../../api/types/auth";
import { AUTH_USER_KEY, authQueryKeys, AuthUser } from "./queryKeys";


export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (payload) => login(payload),
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      queryClient.setQueryData<AuthUser>(authQueryKeys.me(), data.user);
      queryClient.invalidateQueries({ queryKey: authQueryKeys.me() });
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
      }
    },
    onError: (error) => {
      console.error("로그인 실패:", error.message);
    },
  });
}
