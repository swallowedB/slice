import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Dropdown from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Dropdown/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    items: [
      { text: "수정하기", onClick: () => console.log("edit") },
      { text: "삭제하기", onClick: () => console.log("delete") },
    ],
  },
};
