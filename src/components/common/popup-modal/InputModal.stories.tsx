import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from 'storybook/test';
import InputModal from "./InputModal";
import Button from "../button/Button";

const meta = {
  title: "Modal/InputModal",
  component: InputModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "링크 업로드",
    onClose: fn(),
    onConfirm: fn(),
    sizeClass: "max-w-md",
    footer: (
      <div className="flex justify-end gap-2">
        <Button variant="outline-gray">취소</Button>
        <Button variant="primary">확인</Button>
      </div>
    ),
    children: (
      <div className='flex w-full flex-col gap-4'>
        {/* 제목 */}
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium'>
            제목 <span className='text-orange-500'>*</span>
          </label>
          <input
            className='w-full rounded-lg bg-gray-100 px-3 py-2 text-sm'
            placeholder='할 일의 제목을 적어주세요'
          />
        </div>

        {/* 목표 */}
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium'>
            목표 <span className='text-orange-500'>*</span>
          </label>
          <button className='flex w-full items-center justify-between rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-400'>
            목표를 선택해주세요
          </button>
        </div>

        {/* 파일 업로드 구역 */}
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium'>자료</label>
          <div className='flex items-center justify-center rounded-lg border border-dashed border-gray-300 py-6 text-sm text-gray-400'>
            파일을 업로드해주세요
          </div>
        </div>
      </div>
    ),
  },
};
