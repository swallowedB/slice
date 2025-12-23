export type ListItemVariant = "default" | "white";

export type ListActionType = {
  type: "link" | "file" | "note" | "more";
};

export type ActionType = "link" | "file" | "note";

export const ACTION_ARIA_LABEL: Record<ActionType, string> = {
  link: "링크 열기",
  file: "파일 열기",
  note: "노트 작성하기",
};
