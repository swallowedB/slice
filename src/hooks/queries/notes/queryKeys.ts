const notesQueryKeys = {
  all: ["notes"] as const,
  list: (goalId: number) => [...notesQueryKeys.all, { goalId }] as const,
  detail: (noteId: number) => [...notesQueryKeys.all, noteId] as const,
};

export default notesQueryKeys;
