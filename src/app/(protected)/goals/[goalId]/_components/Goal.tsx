"use client";
import { ListGoalType } from "@/components/common/list/list-item/listItem.types";
import GoalSection from "./GoalSection";
import { useListItems } from "@/hooks/useListItems";
import { EMPTY_MESSAGES } from "@/constants/messages";

type GoalProps = {
  goal: ListGoalType;
};

export default function Goal({ goal }: GoalProps) {
  const { items, onToggleChecked } = useListItems(goal.todos);
  const goalTodos = items.filter((t) => !t.checked);
  const goalDones = items.filter((t) => t.checked);
  return (
    <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
      <GoalSection
        title="TO DO"
        items={goalTodos}
        onToggle={onToggleChecked}
        onAdd={() => console.log("mock up")}
        emptyMessage={EMPTY_MESSAGES.TODO.ALL}
        variant="yellow"
        background="bg-orange-100"
      />
      <GoalSection
        title="DONE"
        items={goalDones}
        emptyMessage={EMPTY_MESSAGES.TODO.DONE}
        onToggle={onToggleChecked}
        background="bg-white"
      />
    </section>
  );
}
