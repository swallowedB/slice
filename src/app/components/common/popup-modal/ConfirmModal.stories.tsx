import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from 'storybook/test';
import ConfirmModal from "./ConfirmModal";

const meta = {
  title: "Modal/ConfirmModal",
  component: ConfirmModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConfirmModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args:{
    title: "정말로 삭제하시겠어요?",
    message: "삭제 후에는 복구되지 않아요.",
    confirmText: '확인',
    isOpen: true,
    onClose: fn(),
    onConfirm: fn(),
  }
}