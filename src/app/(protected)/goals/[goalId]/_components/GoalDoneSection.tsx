"use client";

import ListItem from "@/components/common/list/list-item/ListItem";

type GoalDoneSectionProps = {
  items: { id: number; label: string; checked: boolean }[];
  onToggle: (id: number) => void;
};

export default function GoalDoneSection({
  items,
  onToggle,
}: GoalDoneSectionProps) {
  return (
    <div>
      <div className="mb-2.5 flex h-10.5 items-center justify-between">
        <h4 className="pl-2 text-lg font-semibold">DONE</h4>
      </div>

      <div className="min-h-auto rounded-2xl bg-white px-4 py-6 sm:px-6 sm:py-8 lg:rounded-3xl xl:min-h-138">
        <ListItem
          className="grid sm:gap-0.5 lg:gap-1"
          items={items}
          onToggleChecked={onToggle}
        />
      </div>
    </div>
  );
}
