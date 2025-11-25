import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BaseInput from "./BaseInput";

const meta: Meta<typeof BaseInput> = {
  title: "Components/Input/BaseInput",
  component: BaseInput,
  tags: ["autodocs"],
  argTypes: {
    background: {
      control: "radio",
      options: ["sky", "orange"],
    },
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
    background: "sky",
  },
};

export const OrangeBackground: Story = {
  args: {
    value: "",
    placeholder: "오렌지 배경 인풋",
    background: "orange",
  },
};

export const WithIcon: Story = {
  args: {
    value: "",
    placeholder: "아이콘 있는 인풋",
    background: "orange",
    Icon: <span className='text-gray-500'>★</span>,
  },
};
