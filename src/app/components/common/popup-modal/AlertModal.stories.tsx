import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from 'storybook/test';
import AlertModal from "./AlertModal";

const meta = {
  title: "Modal/AlertModal",
  component: AlertModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AlertModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "할 일을 삭제할까요?",
    message: "삭제 후에는 되돌릴 수 없어요.",
    confirmText: "확인",
    isOpen: true,
    onClose: fn(),
  }
}
