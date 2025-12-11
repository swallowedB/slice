const notesQueryKeys = {
  all: ["notes"] as const,
  list: (goalId: number) => [...notesQueryKeys.all, { goalId }] as const,
};

export default notesQueryKeys;
