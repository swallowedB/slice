"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { clearTokens } from "../../../lib/tokenStorage";
import { authQueryKeys } from "./queryKeys";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return () => {
    clearTokens();
    queryClient.removeQueries({ queryKey: authQueryKeys.all });
    router.replace("/login");
  };
}
