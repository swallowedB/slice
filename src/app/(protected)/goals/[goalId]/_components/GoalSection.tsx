import Button from "@/components/common/button/Button";
import TextButton from "@/components/common/button/TextButton";
import EmptyState from "@/components/common/empty-state/EmptyState";
import ListItem from "@/components/common/list/list-item/ListItem";
import { EMPTY_MESSAGES } from "@/constants/messages";
import { PlusIcon } from "@heroicons/react/24/outline";

type GoalSectionProps = {
  title: string;
  items: { id: number; label: string; checked: boolean }[];
  onToggle: (id: number) => void;
  background?: string;
  onAdd?: () => void;
  emptyMessage?: string;
  variant?: string;
};

export default function GoalSection({
  title,
  items,
  onToggle,
  background = "bg-white",
  onAdd,
  emptyMessage,
}: GoalSectionProps) {
  return (
    <div>
      {/* 헤더 */}
      <div className="mb-2.5 flex h-10.5 items-center justify-between">
        <h4 className="pl-2 text-lg font-semibold">{title}</h4>

        {onAdd && (
          <>
            <Button
              variant="outline-gray"
              size="compact"
              className="hidden sm:block"
              onClick={onAdd}>
              <p className="flex items-center justify-center font-semibold">
                <PlusIcon className="mr-1 h-4 w-4" />
                할일추가
              </p>
            </Button>

            <TextButton
              className="block sm:hidden"
              variant="primary"
              onClick={onAdd}>
              <p className="flex items-center justify-center font-semibold">
                <PlusIcon className="mr-1 h-4 w-4" />
                할일추가
              </p>
            </TextButton>
          </>
        )}
      </div>

      {/* 리스트 박스 */}
      <div
        className={`min-h-0 rounded-2xl px-4 py-6 sm:px-6 sm:py-8 lg:rounded-3xl xl:min-h-138 ${background}`}>
        {items.length === 0 ? (
          <EmptyState variant={title === "TO DO" ? "yellow" : "gray"}>
            {title === "TO DO"
              ? `${EMPTY_MESSAGES.TODO.NOT_STARTED}`
              : `${EMPTY_MESSAGES.TODO.COMPLETED}`}
          </EmptyState>
        ) : (
          <ListItem
            className="grid sm:gap-0.5 lg:gap-1"
            items={items}
            onToggleChecked={onToggle}
          />
        )}
      </div>
    </div>
  );
}
