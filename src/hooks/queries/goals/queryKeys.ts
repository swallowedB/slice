const goalsQueryKeys = {
  all: ["goals"] as const,
  list: () => [...goalsQueryKeys.all, "list"] as const,
  detail: (goalId: number) =>
    [...goalsQueryKeys.all, "detail", goalId] as const,
  infinite: () => [...goalsQueryKeys.all, "infinite"] as const,
};

export default goalsQueryKeys;
