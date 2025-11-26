import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Button from "./Button";

const meta = {
  title: "Component/Button",
  component: Button,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "확인",
    variant: "primary",
    isFullWidth: true,
    isDisabled: false,
    onClick: fn(),
  },
};

export const NonFullWidth: Story = {
  args: {
    children: "등록하기",
    variant: "primary",
    isFullWidth: false,
    isDisabled: false,
    onClick: fn(),
  },
};

export const OutlineOrange: Story = {
  args: {
    children: "임시저장",
    variant: "outline-orange",
    isFullWidth: false,
    isDisabled: false,
    onClick: fn(),
  },
};

export const OutlineGray: Story = {
  args: {
    children: "취소",
    variant: "outline-gray",
    isFullWidth: false,
    isDisabled: false,
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    children: "작성완료",
    variant: "primary",
    isFullWidth: true,
    isDisabled: true,
    onClick: fn(),
  },
};
