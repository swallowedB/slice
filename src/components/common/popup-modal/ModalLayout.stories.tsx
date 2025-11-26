import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Button from "../button/Button";
import ModalLayout from "./ModalContent";

const meta = {
  title: "Modal/ModalLayout",
  component: ModalLayout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ModalLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "할 일을 삭제할까요?",
    message: "삭제 후에는 되돌릴 수 없어요.",
    titleAlign: "center",
    isClosable: false,
    children: null,
    onClose: fn(),
    footer: (
      <Button
        variant="primary"
        onClick={fn()}>
        확인
      </Button>
    ),
  },
};
