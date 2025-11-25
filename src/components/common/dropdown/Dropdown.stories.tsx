import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SidebarDropdown from "./Dropdown";

const meta: Meta<typeof SidebarDropdown> = {
  title: "Common/Dropdown/SidebarDropdown",
  component: SidebarDropdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SidebarDropdown>;

export const Default: Story = {
  args: {
    items: [
      "자바스크립트로 웹서비스 만들기",
      "디자인 시스템 강의 듣기",
    ],
  },
};

export const WithManyItems: Story = {
  args: {
    items: [
      "자바스크립트로 웹서비스 만들기",
      "디자인 시스템 강의 듣기",
      "Figma 오토 레이아웃 학습하기",
      "로그인/회원가입 구현하기",
      "배포 자동화 CI/CD 세팅하기",
    ],
  },
};

export const CustomClassName: Story = {
  args: {
    items: ["커스텀 클래스 적용 예시"],
    className: "bg-blue-50",
  },
};