import { useQuery } from "@tanstack/react-query";

type Progress = {
  progress: number;
};

export const useProgressTodos = (teamId: string) => {
  return useQuery<Progress, Error>({
    queryKey: ["todos", teamId, "progress"],
    queryFn: async () => {
      // 🔥 토큰 가져오기 (localStorage, cookie, 또는 다른 방법)
      const token = localStorage.getItem("accessToken"); // 또는 다른 방법

      const response = await fetch(
        `https://sp-slidtodo-api.vercel.app/${teamId}/todos/progress`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`API 에러: ${response.status}`);
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    enabled: !!teamId,
  });
};
