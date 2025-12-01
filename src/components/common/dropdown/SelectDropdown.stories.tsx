import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Dropdown from "./SelectDropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Dropdown/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

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
