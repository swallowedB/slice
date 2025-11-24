import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ListItem from "./ListItem";
import { ListItemType } from "./listItem.types";

const meta: Meta<typeof ListItem> = {
  title: "Common/ListItem",
  component: ListItem,
};

export default meta;
type Story = StoryObj<typeof ListItem>;

const mockItems: ListItemType[] = [
  { id: 1, label: "Next.js 기초 챕터4 듣기", checked: false },
  { id: 2, label: "", checked: true },
  { id: 3, label: "타입스크립트 공부", checked: true },
  { id: 4, label: "청소하기", checked: false },
];

const Interactive = ({ variant }: { variant?: "default" | "white" }) => {
  const [items, setItems] = useState(mockItems);

  const handleChange = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  return (
    <ListItem
      items={items}
      onChange={handleChange}
      variant={variant}
    />
  );
};

export const Default: Story = {
  render: () => <Interactive />,
};

export const White: Story = {
  render: () => <Interactive variant="white" />,
};

export const LongText: Story = {
  args: {
    items: [
      {
        id: 1,
        label:
          "이것은 말도 안 되게 긴 텍스트입니다. 줄이 길어질 때 레이아웃이 어떻게 보이는지 확인하기 위한 문장입니다.",
        checked: false,
      },
    ],
  },
};
