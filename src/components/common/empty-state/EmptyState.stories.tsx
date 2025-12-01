import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import EmptyState from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"], // 자동 문서화 지원되면 유용
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["gray", "yellow"],
    },
    children: {
      control: "text",
    },
  },
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Gray: Story = {
  args: {
    variant: "gray",
    children: "등록된 항목이 없습니다.",
  },
};

export const Yellow: Story = {
  args: {
    variant: "yellow",
    children: "최근에 등록된 할일이 없어요.",
  },
};

export const LongText: Story = {
  args: {
    variant: "gray",
    children: "데이터가 존재하지 않습니다. 새로운 항목을 추가해보세요!",
  },
};
