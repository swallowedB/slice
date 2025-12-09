const todosQueryKeys = {
  all: ["todos"] as const,
  list: () => [...todosQueryKeys.all] as const,
  getProgress: () => [...todosQueryKeys.all, "progress"] as const,
};

export default todosQueryKeys;
