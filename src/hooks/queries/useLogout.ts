"use client";
import { useQueryClient } from "@tanstack/react-query";
import { clearTokens } from "../../lib/tokenStorage";

export function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    clearTokens();
    queryClient.removeQueries({ queryKey: ["auth"] });
  };
}
