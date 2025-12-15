import TodoButton from "@/app/(protected)/_components/todo-button/TodoButton";
import EmptyState from "@/components/common/empty-state/EmptyState";
import ListItem from "@/components/common/list/list-item/ListItem";
import { ListTodoType } from "@/components/common/list/list-item/types";
import { EMPTY_MESSAGES } from "@/constants/messages";

type GoalSectionProps = {
  title: string;
  items: ListTodoType[];
  onToggleChecked: (id: number, checked: boolean) => void;
  background?: string;
  emptyMessage?: string;
  variant?: string;
};

export default function GoalSection({
  title,
  items,
  onToggleChecked,
  background = "bg-white",
}: GoalSectionProps) {
  return (
    <div>
      <div className="relative mb-2.5 flex h-10.5 items-center justify-between">
        <h4 className="pl-2 text-lg font-semibold">{title}</h4>

        {title === "TO DO" && (
          <TodoButton className="top-1/2 translate-y-[-50%]" />
        )}
      </div>

      <div
        className={`min-h-0 rounded-2xl px-4 py-6 sm:min-h-138 sm:px-6 sm:py-8 lg:rounded-3xl ${background}`}>
        {items.length === 0 ? (
          <EmptyState variant={title === "TO DO" ? "yellow" : "gray"}>
            {title === "TO DO"
              ? `${EMPTY_MESSAGES.TODO.ALL}`
              : `${EMPTY_MESSAGES.TODO.DONE}`}
          </EmptyState>
        ) : (
          <ListItem
            className="grid sm:gap-0.5 lg:gap-1"
            items={items}
            onToggleChecked={onToggleChecked}
          />
        )}
      </div>
    </div>
  );
}
