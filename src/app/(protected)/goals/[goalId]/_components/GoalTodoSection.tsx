"use client";

import Button from "@/components/common/button/Button";
import TextButton from "@/components/common/button/TextButton";
import ListItem from "@/components/common/list/list-item/ListItem";
import { PlusIcon } from "@heroicons/react/24/outline";

type GoalTodoSectionProps = {
  items: { id: number; label: string; checked: boolean }[];
  onAdd: () => void;
  onToggle: (id: number) => void;
};

export default function GoalTodoSection({
  items,
  onAdd,
  onToggle,
}: GoalTodoSectionProps) {
  return (
    <div>
      <div className="mb-2.5 flex h-10.5 items-center justify-between">
        <h4 className="pl-2 text-lg font-semibold">TO DO</h4>

        <Button
          variant="outline-gray"
          size="compact"
          className="hidden sm:block"
          onClick={onAdd}>
          <p className="absolute top-7.25 right-5 flex w-18.5 items-center justify-center font-semibold sm:static sm:w-full">
            <PlusIcon className="mr-1 h-4 w-4 sm:mr-1.5 sm:h-4.5 sm:w-4.5" />
            할일추가
          </p>
        </Button>

        <TextButton
          className="block sm:hidden"
          variant="primary"
          onClick={onAdd}>
          <p className="flex w-18.5 items-center justify-center font-semibold sm:static sm:w-full">
            <PlusIcon className="mr-1 h-4 w-4 sm:mr-1.5 sm:h-4.5 sm:w-4.5" />
            할일추가
          </p>
        </TextButton>
      </div>

      {items.length === 0 && <p>할 일이 없어요!</p>}
      <div className="min-h-auto rounded-2xl bg-orange-100 px-4 py-6 sm:px-6 sm:py-8 lg:rounded-3xl xl:min-h-138">
        <ListItem
          className="grid sm:gap-0.5 lg:gap-1"
          items={items}
          onToggleChecked={onToggle}
        />
      </div>
    </div>
  );
}
