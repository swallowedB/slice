const goalsQueryKeys = {
  all: ["goals"] as const,
  lists: () => [...goalsQueryKeys.all, "list"] as const,
  detail: (goalId: number) =>
    [...goalsQueryKeys.all, "detail", goalId] as const,
};

export default goalsQueryKeys;
