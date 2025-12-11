const notesQueryKeys = {
  all: ["notes"] as const,
  list: () => [...notesQueryKeys.all] as const,
};

export default notesQueryKeys;
