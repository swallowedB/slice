import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Button from "./Button";

const meta = {
  title: "Component/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "로그인하기",
    variant: "primary",
    isFullWidth: true,
    isRounded: false,
    isDisabled: false,
    onClick: fn(),
  },
};

export const Outline: Story = {
  args: {
    children: "회원가입",
    variant: "outline",
    isFullWidth: true,
    isRounded: false,
    isDisabled: false,
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    children: "비활성화",
    variant: "primary",
    isFullWidth: true,
    isRounded: false,
    isDisabled: true,
    onClick: fn(),
  },
};
