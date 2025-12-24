const filesQueryKeys = {
  all: ["files"] as const,
  upload: () => [...filesQueryKeys.all, "upload"] as const,
};

export default filesQueryKeys;
