export type ListItemVariant = "default" | "white";

export type ListItemType = {
  id: number;
  label: string;
  checked: boolean;
  link?: string; // ✅ 링크가 있으면
  file?: string; // ✅ 파일이 있으면
  note?: string; // ✅ 노트가 있으면
};

export type ListActionType = {
  type: "link" | "file" | "note" | "more";
};
