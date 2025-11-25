export type ListItemVariant = "default" | "white";

export type ListItemType = {
  id: number;
  label: string;
  checked: boolean;
  link?: boolean;
  file?: boolean;
  note?: boolean;
};

export type ListActionType = {
  type: "link" | "file" | "note" | "more";
};
