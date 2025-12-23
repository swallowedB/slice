import ListItem from "@/components/common/list/list-item/ListItem";
import { ListTodoType } from "@/components/common/list/list-item/types";
import EmptyState from "@/components/common/empty-state/EmptyState";
import GoalHeader from "./GoalHeader";
import GoalTodoBox from "./GoalTodoBox";
import { EMPTY_MESSAGES } from "@/constants/messages";
import { useToggleTodo } from "@/hooks/queries/todos";
type GoalCardProps = {
  title: string;
  percent: number;
  todoItems: ListTodoType[];
  doneItems: ListTodoType[];
  isOpen: boolean;
  onToggle: () => void;
  cardStyles: string;
};

export default function GoalCard({
  title,
  percent,
  todoItems,
  doneItems,
  isOpen,
  onToggle,
  cardStyles,
}: GoalCardProps) {
  const { handleToggle } = useToggleTodo();

  const noTodos = todoItems.length === 0 && doneItems.length === 0;

  const isOpenWithTodos = isOpen && noTodos;
  const isOpenWithNoTodos = isOpen && !noTodos;

  return (
    <div
      className={` ${cardStyles} ${isOpen ? "sm:pb-4" : "pb-13.5 sm:pb-7.5"}`}>
      {title && (
        <GoalHeader
          title={title}
          isOpen={isOpen}
          percent={percent}
          onToggle={onToggle}
        />
      )}

      {isOpenWithTodos && <EmptyState>{EMPTY_MESSAGES.TODO.ALL}</EmptyState>}

      {isOpenWithNoTodos && (
        <div className="mt-6.5 grid grid-cols-1 overflow-hidden sm:grid-cols-2 sm:gap-2">
          <GoalTodoBox
            title="TO DO"
            variant="todo">
            <ListItem
              className="grid overflow-hidden sm:gap-0.5 lg:gap-1"
              items={todoItems}
              onToggleChecked={handleToggle}
              containerClassName="sm:h-48 lg:h-60 overflow-y-auto"
            />
          </GoalTodoBox>
          <GoalTodoBox
            title="DONE"
            variant="done">
            <ListItem
              className="grid overflow-y-auto sm:gap-0.5 lg:gap-1"
              items={doneItems}
              onToggleChecked={handleToggle}
              containerClassName="sm:h-48 lg:h-60 overflow-y-auto"
            />
          </GoalTodoBox>
        </div>
      )}
    </div>
  );
}
