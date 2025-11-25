import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AuthInput from "./AuthInput";

const meta = {
  title: "Components/Input/AuthInput",
  component: AuthInput,
  tags: ["autodocs"],
} satisfies Meta<typeof AuthInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmailDefault: Story = {
  args: {
    type: "email",
    value: "",
    status: "default",
    onChangeInput: () => {},
  },
};

export const PasswordDefault: Story = {
  args: {
    type: "password",
    value: "",
    isPasswordVisible: false,
    onChangeInput: () => {},
    onClickTogglePassword: () => {},
  },
};

export const EmailError: Story = {
  args: {
    type: "email",
    value: "wrong@email",
    status: "error",
    onChangeInput: () => {},
  },
};