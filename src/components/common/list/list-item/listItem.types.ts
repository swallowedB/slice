export type ListItemVariant = "default" | "white";

export type ListActionType = {
  type: "link" | "file" | "note" | "more";
};

export type ListTodoType = {
  id: string;
  label: string;
  checked: boolean;
  link?: boolean;
  file?: boolean;
  note?: boolean;
};

export type ListGoalType = {
  id: string;
  title: string;
  todos: ListTodoType[];
};
