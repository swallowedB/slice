import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BaseInput from "./BaseInput";

const meta: Meta<typeof BaseInput> = {
  title: "Input/BaseInput",
  component: BaseInput,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
    Icon: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof BaseInput>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "기본 인풋",
  },
};

export const WithIcon: Story = {
  args: {
    value: "",
    placeholder: "아이콘 있는 인풋",
    Icon: <span className="text-gray-500">★</span>,
  },
};
