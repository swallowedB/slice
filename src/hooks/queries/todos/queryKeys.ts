const todosQueryKeys = {
  all: ["todos"] as const,

  list: () => [...todosQueryKeys.all] as const,
  detail: (todoId: number) => [...todosQueryKeys.all, todoId] as const,
  getProgress: () => [...todosQueryKeys.all, "progress"] as const,
  create: () => [...todosQueryKeys.all, "create"] as const,
  edit: (todoId: number) => [...todosQueryKeys.all, "edit", todoId] as const,
};

export default todosQueryKeys;
