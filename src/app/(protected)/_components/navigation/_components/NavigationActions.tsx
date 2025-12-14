import Button from "@/components/common/button/Button";
import { FlagIcon, Square2StackIcon } from "@heroicons/react/24/solid";

interface Props {
  onClickNewGoal: () => void;
  onClickNewTodo: () => void;
}

export default function NavigationActions({
  onClickNewGoal,
  onClickNewTodo,
}: Props) {

  return (
    <div className="mb-6 flex w-full gap-4">
      <Button
        aria-label="새 목표 추가"
        onClick={onClickNewGoal}>
        <div className="-pl-1 flex items-center justify-center gap-2 text-base font-medium">
          <FlagIcon className="h-5 w-5" />
          <p>새 목표</p>
        </div>
      </Button>
      <Button
        aria-label="새 할일 추가"
        variant="outline-orange"
        onClick={onClickNewTodo}>
        <div className="-pl-1 flex items-center justify-center gap-2 text-base font-medium">
          <Square2StackIcon className="h-5 w-5" />
          <p>새 할일</p>
        </div>
      </Button>
    </div>
  );
}
