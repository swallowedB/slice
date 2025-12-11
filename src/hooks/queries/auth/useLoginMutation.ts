import { login } from "@/api/auth";
import { setTokens } from "@/lib/tokenStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "../../../api/types/auth";
import { AUTH_USER_KEY, authQueryKeys, AuthUser } from "./queryKeys";
import { useAuthStore } from "@/store/useAuthStore";


export function useLoginMutation() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (payload) => login(payload),
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: authQueryKeys.me() });
    },
    onError: (error) => {
      console.error("로그인 실패:", error.message);
    },
  });
}
