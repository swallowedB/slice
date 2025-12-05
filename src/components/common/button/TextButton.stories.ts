import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import TextButton from "./TextButton";

const meta = {
  title: "Button/TextButton",
  component: TextButton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "수정하기",
    variant: "primary",
    isDisabled: false,
    onClick: fn(),
  },
};

export const Secondary: Story = {
  args: {
    children: "취소",
    variant: "secondary",
    isDisabled: false,
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    children: "등록하기",
    variant: "primary",
    isDisabled: true,
    onClick: fn(),
  },
};
