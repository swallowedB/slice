import { Todo } from "@/api/types/todo";
export type ListItemVariant = "default" | "white";

export type ListActionType = {
  type: "link" | "file" | "note" | "more";
};

export type ListTodoType = {
  id: number;
  label: string;
  checked: boolean;
  link?: boolean;
  file?: boolean;
  note?: boolean;
  goal?: {
    id: number;
    title: string;
  };
  todo?: Todo;
};

export type ListGoalType = {
  id: number;
  title: string;
  todos: ListTodoType[];
};
