const todosQueryKeys = {
  all: ["todos"] as const,
  list: () => [...todosQueryKeys.all] as const,
  detail: (todoId: number) => [...todosQueryKeys.all, todoId] as const,
  getProgress: () => [...todosQueryKeys.all, "progress"] as const,
};

export default todosQueryKeys;
