import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SelectBox from "./SelectBox";

const meta: Meta<typeof SelectBox> = {
  title: "SelectBox/SelectBox",
  component: SelectBox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SelectBox>;

export const SelectSidebar: Story = {
  args: {
    items: ["자바스크립트로 웹서비스 만들기", "디자인 시스템 강의 듣기"],
  },
};

export const SelectMenu: Story = {
  args: {
    items: ["노트 작성하기", "수정하기", "삭제하기"],
    variant: "menu",
  },
};
