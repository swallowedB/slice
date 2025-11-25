export type ListItemVariant = "default" | "white";

export type ListItemType = {
  id: number;
  label: string;
  checked: boolean;
  link?: string;
  file?: string;
  note?: string;
};

export type ListActionType = {
  type: "link" | "file" | "note" | "more";
};
