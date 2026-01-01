import { login, me } from "@/api/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginRequest } from "../../../api/types/auth";
import { authQueryKeys } from "./queryKeys";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<{ ok: true }, Error, LoginRequest>({
    mutationFn: (payload) => login(payload),
    onSuccess: async () => {
      const user = await me();
      setUser(user);
      queryClient.invalidateQueries({ queryKey: authQueryKeys.me() });
    },
    onError: (error) => {
      console.error("로그인 실패:", error.message);
    },
  });
}
