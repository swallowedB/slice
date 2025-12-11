"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authQueryKeys } from "./queryKeys";
import { useAuthStore } from "@/store/useAuthStore";
import { clearTokens } from "@/lib/tokenStorage";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);

  return () => {
    clearTokens();
    clearUser();
    queryClient.removeQueries({ queryKey: authQueryKeys.all });
    router.replace("/login");
  };
}
