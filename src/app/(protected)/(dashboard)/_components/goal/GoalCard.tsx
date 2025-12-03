import ListItem from "@/components/common/list/list-item/ListItem";
import { ListTodoType } from "@/components/common/list/list-item/listItem.types";
import EmptyState from "@/components/common/empty-state/EmptyState";
import GoalHeader from "./GoalHeader";
import GoalTodoBox from "./GoalTodoBox";
import { EMPTY_MESSAGES } from "@/constants/messages";
import { useListItems } from "@/hooks/useListItems";
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
  const allItems = [...todoItems, ...doneItems];
  const { items, onToggleChecked } = useListItems(allItems);

  if (!title) return null;

  const noTodos = todoItems.length === 0 && doneItems.length === 0;

  const todoState = items.filter((item) => !item.checked);
  const doneState = items.filter((item) => item.checked);
  return (
    <div
      className={`${cardStyles} ${isOpen ? "sm:pb-4" : "pb-13.5 sm:pb-7.5"}`}>
      <GoalHeader
        title={title}
        isOpen={isOpen}
        percent={percent}
        onToggle={onToggle}
      />
      {/* 목표는 있고, 등록된 할 일이 없는 상태 */}
      {noTodos && isOpen && (
        <EmptyState>{EMPTY_MESSAGES.GOAL.RECENT}</EmptyState>
      )}
      {/* 목표 있고, 할일도 있고, isOpen이면 출력 */}
      {!noTodos && isOpen && (
        <div className="mt-6.5 grid grid-cols-1 sm:mt-11 sm:grid-cols-2 sm:gap-2 lg:mt-4 lg:gap-8">
          <GoalTodoBox
            title="TO DO"
            variant="todo">
            <ListItem
              className="grid sm:gap-0.5 lg:gap-1"
              items={todoState}
              onToggleChecked={onToggleChecked}
            />
          </GoalTodoBox>
          <GoalTodoBox
            title="DONE"
            variant="done">
            <ListItem
              className="grid sm:gap-0.5 lg:gap-1"
              items={doneState}
              onToggleChecked={onToggleChecked}
            />
          </GoalTodoBox>
        </div>
      )}
    </div>
  );
}
