"use client";
import {
  ListGoalType,
  ListTodoType,
} from "@/components/common/list/list-item/types";
import GoalSection from "./GoalSection";
import { EMPTY_MESSAGES } from "@/constants/messages";
import { useToggleTodo } from "@/hooks/queries/todos";

export default function Goal({ goalTodos }: { goalTodos: ListTodoType[] }) {
  const { handleToggle } = useToggleTodo();

  const goalTodoChecked = goalTodos.filter((goalTodo) => !goalTodo.checked);
  const goalTodoCheckedDone = goalTodos.filter((goalTodo) => goalTodo.checked);
  return (
    <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
      <GoalSection
        title="TO DO"
        items={goalTodoChecked}
        onToggleChecked={handleToggle}
        onAdd={() => console.log("mock up")}
        emptyMessage={EMPTY_MESSAGES.TODO.ALL}
        variant="yellow"
        background="bg-orange-100"
      />
      <GoalSection
        title="DONE"
        items={goalTodoCheckedDone}
        emptyMessage={EMPTY_MESSAGES.TODO.DONE}
        onToggleChecked={handleToggle}
        background="bg-white"
      />
    </section>
  );
}
