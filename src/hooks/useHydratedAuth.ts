import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export const useAuthenticated = () => {
  const router = useRouter();
  const { hydrated, user } = useAuthStore();

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  return { isReady: hydrated, user };
};
