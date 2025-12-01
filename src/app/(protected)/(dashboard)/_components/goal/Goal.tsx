import EmptyState from "@/components/common/empty-state/EmptyState";
import GoalCard from "./GoalCard";
import { ListGoalType } from "@/components/common/list/list-item/listItem.types";

type GoalProps = {
  mockGoalItem: ListGoalType[];
  cardStyles: string;
  onToggle: (id: number) => void;
  onChange: (id: number) => void;
  openCards: Record<number, boolean>;
};

export default function Goal({
  mockGoalItem,
  cardStyles,
  onToggle,
  onChange,
  openCards,
}: GoalProps) {
  return (
    <section>
      {/* 목표별 할 일  */}
      <div>
        <h3 className="mb-2.5 flex flex-wrap items-center pl-2 font-medium sm:text-base lg:text-lg">
          <p className="flex flex-wrap items-center">
            <img
              src="/icons/icon-goal.svg"
              alt="목표 아이콘"
              className="mr-2 h-8 w-8 lg:mr-3 lg:h-10 lg:w-10"
            />
            목표별 할일
          </p>
        </h3>
        <div>
          <div>
            {mockGoalItem.length === 0 ? (
              <div className={cardStyles}>
                <EmptyState>최근 등록한 할일이 없어요</EmptyState>
              </div>
            ) : (
              mockGoalItem.map((goal, index) => {
                const todoItems = goal.todos.filter((t) => !t.checked);
                const doneItems = goal.todos.filter((t) => t.checked);
                return (
                  <GoalCard
                    key={goal.id}
                    title={goal.title}
                    percent={60}
                    todoItems={todoItems}
                    doneItems={doneItems}
                    isOpen={openCards[index]}
                    onToggle={() => onToggle(index)}
                    onChange={onChange}
                    cardStyles={cardStyles}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
