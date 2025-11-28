"use client";
import Link from "next/link";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { ListItemType } from "@/components/common/list/list-item/listItem.types";
import ListItem from "@/components/common/list/list-item/ListItem";
import Progress from "../../../components/progress/Progress";
import ProgressBar from "./_components/ProgressBar";
import Button from "@/components/common/button/Button";

// 최근 등록한 할일
const mockRecentItem: ListItemType[] = [
  {
    id: 1,
    label: "사용자 데이터 렌더링 구현",
    checked: false,
    link: true,
  },
  {
    id: 2,
    label: "2사용자 데이터 렌더링 구현",
    checked: true,
    link: true,
    file: true,
  },
  {
    id: 3,
    label: "33사용자 데이터 렌더링 구현",
    checked: true,
    link: true,
    note: true,
  },
];
// 목표 별 할일
const mockGoalItem: ListItemType[] = [
  {
    id: 1,
    label: "사용자 데이터 렌더링 구현",
    checked: false,
    note: true,
    link: true,
    file: true,
  },
  {
    id: 2,
    label: "사용자 데이터 렌더링 보다는 다른게 더 중요해",
    checked: true,
    note: true,
    link: true,
    file: true,
  },
];

export default function DashBoardPage() {
  //mock up 에서 구조만 맞춤
  const handleChange = (id: number) => {
    console.log("clicked", id);
  };

  const todoItems = mockGoalItem.filter((item) => !item.checked);
  const doneItems = mockGoalItem.filter((item) => item.checked);

  return (
    <div className="h-screen">
      <h2 className="color-black hidden sm:mb-8.5 sm:block sm:pl-2 sm:text-2xl sm:font-semibold">
        체다치즈님의 대시보드
      </h2>
      {/* 최근 등록한 할일 */}
      <section className="sm:mb-8 lg:mb-8.5">
        {/* 최근 등록한 할일 */}
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 sm:gap-3 lg:gap-8">
          {/* 최근 등록한 할일 title */}
          <div className="w-full">
            <h3 className="flex flex-wrap items-center justify-between pr-3.5 pl-2 font-medium text-gray-700 sm:text-base lg:text-lg">
              <p className="mb-2.5 flex flex-wrap items-center">
                <img
                  src="/icons/icon-todo.svg"
                  alt="할일 아이콘"
                  className="h-8 w-8 sm:mr-2 lg:mr-3 lg:h-10 lg:w-10"
                />
                최근 등록한 할일
              </p>
              <Link
                className="text-orange-250 flex items-center font-semibold sm:text-sm lg:text-base"
                href="./page.tsx">
                모두 보기
                <ChevronRightIcon
                  width={20}
                  className="text-orange-250"
                />
              </Link>
            </h3>
            <div className="bg-orange-250 shadow-[0_10px_40px_0_rgba(255,158,89,0.4)] transition-all sm:h-46.5 sm:rounded-[28px] sm:p-3.75 lg:h-64 lg:rounded-[40px] lg:p-7.5 lg:hover:shadow-[0_10px_40px_0_rgba(255,158,89,0.4)]">
              <ListItem
                items={[...mockRecentItem]}
                onChange={handleChange}
                variant="white"
              />
            </div>
          </div>

          <div className="w-full">
            {/* 내 진행 상황 title */}
            <h3 className="mb-2.5 flex flex-wrap items-center pl-2 font-medium text-gray-700 sm:text-base lg:text-lg">
              <img
                src="/icons/icon-progress.svg"
                alt="진행 아이콘"
                className="h-8 w-8 sm:mr-2 lg:mr-3 lg:h-10 lg:w-10"
              />
              내 진행 상황
            </h3>
            {/* 퍼센트 */}
            <div className="bg-blue-200 bg-[url('/images/dashboard/obj-progress.png')] bg-contain bg-no-repeat p-0 shadow-[0_10px_40px_0_rgba(0,212,190,0.24)] transition-all sm:h-46.5 sm:rounded-[28px] lg:h-64 lg:rounded-[40px] lg:bg-[length:222px_auto] lg:bg-[right_-4px_bottom_-45px] lg:p-7.5 lg:hover:shadow-[0_10px_40px_0_rgba(0,212,190,0.24)]">
              <Progress
                percent={40}
                variant="large"
                title={`체다치즈님의 진행도는`}
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          {/* 목표별 할 일 title */}
          <h3 className="flex flex-wrap items-center justify-between pr-3.5 pl-2 text-lg font-medium text-gray-700">
            <p className="mb-2.5 flex flex-wrap items-center">
              <img
                src="/icons/icon-goal.svg"
                alt="목표 아이콘"
                className="mr-3 h-8 w-8 lg:h-10 lg:w-10"
              />
              목표별 할일
            </p>
          </h3>
          {/* 목표별 할 일 */}
          <div>
            {/* 하나의 할 일 */}
            <div className="rounded-[40px] bg-white p-7.5 shadow-[0_4px_4px_0_rgba(0,0,0,0.025)] transition-all lg:hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.025)]">
              {/* 목표 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h4 className="min-w-58 pl-3.5 text-base font-semibold">
                    자바스크립트로 웹 서비스 만들기
                  </h4>
                  <ProgressBar percent={60} />
                </div>
                <div className="flex pr-2.5">
                  {/* 우선 버튼 스킵 */}
                  <Button
                    onClick={() => onclick}
                    variant="outline-gray"
                    size="compact"
                    isDisabled={false}>
                    <p className="flex justify-center">
                      <PlusIcon
                        width={18}
                        height={18}
                        className="mr-1.5"
                      />
                      할일추가
                    </p>
                  </Button>
                  <button className="hover:text-gray-650 ml-4 h-10 w-10 cursor-pointer rounded-full border border-gray-200 text-gray-600 hover:border-gray-300">
                    <ChevronDownIcon
                      width={20}
                      className="m-auto"
                    />
                  </button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="h-81 w-full rounded-3xl bg-orange-100 p-6">
                  <h5 className="text-orange-250 mb-3.75 pl-2.5 text-base font-bold">
                    TO DO
                  </h5>
                  <ListItem
                    items={todoItems}
                    onChange={handleChange}
                  />
                </div>
                <div className="h-81 w-full rounded-3xl p-6">
                  <h5 className="mb-3.75 pl-2.5 text-base font-bold text-gray-400">
                    DONE
                  </h5>
                  <ListItem
                    items={doneItems}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6.5 rounded-[40px] bg-white p-7.5 shadow-[0_4px_4px_0_rgba(0,0,0,0.025)] transition-all lg:hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.025)]">
              {/* 목표 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h4 className="min-w-58 pl-3.5 text-base font-semibold">
                    자바스크립트로 웹 서비스 만들기
                  </h4>
                  <ProgressBar percent={60} />
                </div>
                <div className="flex pr-2.5">
                  {/* 우선 버튼 스킵 */}
                  <Button
                    onClick={() => onclick}
                    variant="outline-gray"
                    size="compact"
                    isDisabled={false}>
                    <p className="flex justify-center">
                      <PlusIcon
                        width={18}
                        height={18}
                        className="mr-1.5"
                      />
                      할일추가
                    </p>
                  </Button>
                  <button className="hover:text-gray-650 ml-4 h-10 w-10 cursor-pointer rounded-full border border-gray-200 text-gray-600 hover:border-gray-300">
                    <ChevronDownIcon
                      width={20}
                      className="m-auto"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
