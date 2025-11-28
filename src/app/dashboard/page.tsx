"use client";
import Image from "next/image";
import ListItem from "@/components/common/list/list-item/ListItem";
import { ListItemType } from "@/components/common/list/list-item/listItem.types";
import Link from "next/link";
import Progress from "../../components/progress/Progress";
import ProgressBar from "./_components/ProgressBar";
import Button from "@/components/common/button/Button";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import TodoImg from "@/assets/icons/icon-todo.svg";
// import GoalImg from "@/assets/icons/icon-goal.svg";
import ProgressImg from "@/assets/icons/icon-progress.svg";

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
    <main className="ml-auto min-h-screen pt-20 pb-20">
      <h2 className="color-black hidden sm:mb-8.5 sm:block sm:pl-2 sm:text-2xl sm:font-semibold">
        체다치즈님의 대시보드
      </h2>
      {/* 최근 등록한 할일 */}
      <section className="mb-8.5">
        {/* 최근 등록한 할일 */}
        <div className="flex w-full gap-8">
          {/* 최근 등록한 할일 title */}
          <div className="w-full">
            <h3 className="flex flex-wrap items-center justify-between pr-3.5 pl-2 text-lg font-medium text-gray-700">
              <p className="mb-2.5 flex flex-wrap items-center">
                <i className="mr-3 flex h-10 w-10 rounded-xl bg-[#ffd0aa]">
                  <Image
                    src={TodoImg}
                    alt="할일"
                    width={20}
                    height={26}
                    className="m-auto"
                  />
                </i>
                최근 등록한 할일
              </p>
              <Link
                className="text-orange-250 flex items-center text-base font-semibold"
                href="./page.tsx">
                모두 보기
                <ChevronRightIcon
                  width={20}
                  className="text-orange-250"
                />
              </Link>
            </h3>
            <div className="bg-orange-250 h-64 rounded-[40px] p-7.5">
              <ListItem
                items={[...mockRecentItem]}
                onChange={handleChange}
                variant="white"
              />
            </div>
          </div>

          <div className="w-full">
            {/* 내 진행 상황 title */}
            <h3 className="mb-2.5 flex flex-wrap items-center pl-2 text-lg font-medium text-gray-700">
              <i className="mr-3 flex h-10 w-10 rounded-xl bg-[#C0E8E4]">
                <Image
                  src={ProgressImg}
                  alt="할일"
                  width={24}
                  height={24}
                  className="m-auto"
                />
              </i>
              내 진행 상황
            </h3>
            {/* 퍼센트 */}
            <div className="h-64 rounded-[40px] bg-blue-200 bg-[url('/images/dashboard/obj-progress.png')] bg-contain bg-no-repeat p-7.5 lg:bg-[length:222px_auto] lg:bg-[right_-4px_bottom_-45px]">
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
              <i className="mr-3 flex h-10 w-10 rounded-xl bg-blue-100">
                <Image
                  src={TodoImg}
                  alt="할일"
                  width={20}
                  height={26}
                  className="m-auto"
                />
              </i>
              목표별 할일
            </p>
          </h3>
          {/* 목표별 할 일 */}
          <div>
            {/* 하나의 할 일 */}
            <div className="rounded-[40px] bg-white p-7.5">
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
                    <p className="flex">
                      <PlusIcon
                        width={20}
                        height={20}
                      />
                      할일추가
                    </p>
                  </Button>
                  <button className="hover:text-gray-650 ml-4 h-10 w-10 cursor-pointer rounded-full border border-gray-200 text-gray-600 hover:border-gray-300">
                    <ChevronDownIcon />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex gap-8">
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

            <div className="mt-6.5 rounded-[40px] bg-white p-7.5">
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
                    <p className="flex">
                      <PlusIcon
                        width={20}
                        height={20}
                      />
                      할일추가
                    </p>
                  </Button>
                  <button className="hover:text-gray-650 ml-4 h-10 w-10 cursor-pointer rounded-full border border-gray-200 text-gray-600 hover:border-gray-300">
                    <ChevronDownIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
