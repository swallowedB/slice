"use client";
import { useQueryClient } from "@tanstack/react-query";
import { clearTokens } from "../../api/tokenStorage";

export function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    clearTokens();
    queryClient.removeQueries({ queryKey: ["auth"] });
  };
}
