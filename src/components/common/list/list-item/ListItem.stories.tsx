import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import { useState } from "react";

import ListItem from "./ListItem";
import type { ListItemType } from "./listItem.types";

const meta: Meta<typeof ListItem> = {
  title: "Common/List/ListItem",
  component: ListItem,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "white"],
      description: "리스트 스타일 variants",
    },
    items: {
      description: "리스트 아이템 배열",
    },
    onChange: {
      description: "체크박스 클릭 시 실행",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

type ListItemStoryProps = ComponentProps<typeof ListItem>;

const mockItems: ListItemType[] = [
  { id: 1, label: "Next.js 공부", checked: false, link: true },
  { id: 2, label: "타입스크립트", checked: true, file: true },
  {
    id: 3,
    label: "청소하기",
    checked: false,
    note: true,
    link: true,
    file: true,
  },
  { id: 4, label: "아무것도 없음", checked: false },
];

const Interactive = (args: ListItemStoryProps) => {
  const [items, setItems] = useState<ListItemType[]>(args.items);

  const handleChange = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  return (
    <ListItem
      {...args}
      items={items}
      onChange={handleChange}
    />
  );
};

export const Default: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    items: mockItems,
    variant: "default",
  },
};

export const White: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    items: mockItems,
    variant: "white",
  },
};

export const NoActions: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    items: mockItems.map((item) => ({
      id: item.id,
      label: item.label,
      checked: item.checked,
    })),
  },
};

export const OnlyMore: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    items: mockItems.map((item) => ({
      ...item,
      link: false,
      file: false,
      note: false,
    })),
  },
};

export const LongText: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    items: mockItems.map((item) => ({
      ...item,
      label:
        "이건 일부러 엄청 길게 늘려서 truncate / max-width / hover / flex / icon 겹침 여부를 테스트하는 초장문 라벨입니다. 여기서 레이아웃 안 깨지면 그냥 승리 선언해도 됩니다. overkill of overkill.",
      link: true,
      file: true,
      note: false,
    })),
  },
};
