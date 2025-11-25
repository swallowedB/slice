import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ListItem from "./ListItem";
import { ListItemType } from "./listItem.types";
import { useArgs } from "storybook/internal/preview-api";

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

const getMockItems = (): ListItemType[] => [
  { id: 1, label: "영어 단어 외우기", checked: false },
  { id: 2, label: "운동 30분", checked: true },
  { id: 3, label: "이력서 업데이트", checked: false },
];

export const Default: Story = {
  args: {
    variant: "default",
    items: getMockItems(),
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    const handleChange = (id: number) => {
      updateArgs({
        items: args.items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item,
        ),
      });
    };

    return (
      <ListItem
        {...args}
        onChange={handleChange}
      />
    );
  },
};

export const White: Story = {
  args: {
    variant: "white",
    items: getMockItems(),
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    const handleChange = (id: number) => {
      updateArgs({
        items: args.items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item,
        ),
      });
    };

    return (
      <ListItem
        {...args}
        onChange={handleChange}
      />
    );
  },
};
