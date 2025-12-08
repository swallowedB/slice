"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../api/auth";
import { setTokens } from "../../lib/tokenStorage";
import { LoginRequest, LoginResponse } from "../../api/types/auth";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (payload) => loginApi(payload),
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
    onError: (error) => {
      console.error("로그인 실패:", error.message);
    },
  });
}
