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
import { useEffect, useState } from "react";

// 최근 등록한 할일
const mockRecentItem: ListItemType[] = [
  { id: 1, label: "사용자 데이터 렌더링 구현", checked: false, link: true },
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
  // 완전 목업!
  const [isOpen, setIsOpen] = useState([false, true]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const todoItems = mockGoalItem.filter((item) => !item.checked);
  const doneItems = mockGoalItem.filter((item) => item.checked);
  return (
    <div className="h-screen">
      <h2 className="color-black hidden sm:mb-8.5 sm:block sm:pl-2 sm:text-2xl sm:font-semibold">
        체다치즈님의 대시보드
      </h2>
      {/* 최근 등록한 할일 */}
      <section className="mb-7.5 sm:mb-8 lg:mb-8.5">
        {/* 최근 등록한 할일 */}
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 sm:gap-3 lg:gap-8">
          {/* 최근 등록한 할일 title */}
          <div className="w-full">
            <h3 className="flex flex-wrap items-center justify-between pr-3.5 pl-2 text-base font-medium lg:text-lg">
              <p className="mb-2.5 flex flex-wrap items-center">
                <img
                  src="/icons/icon-todo.svg"
                  alt="할일 아이콘"
                  className="mr-2 h-8 w-8 lg:mr-3 lg:h-10 lg:w-10"
                />
                최근 등록한 할일
              </p>
              <Link
                className="text-orange-250 flex items-center text-sm font-semibold lg:text-base"
                href="./page.tsx">
                모두 보기
                <ChevronRightIcon className="text-orange-250 ml-0.5 w-3.5 sm:ml-0 sm:w-5" />
              </Link>
            </h3>
            <div className="bg-orange-250 h-46.5 rounded-[28px] px-4 py-4.5 shadow-[0_10px_40px_0_rgba(255,158,89,0.4)] transition-all sm:p-3.75 lg:h-64 lg:rounded-[40px] lg:p-7.5 lg:hover:shadow-[0_10px_40px_0_rgba(255,158,89,0.4)]">
              <ListItem
                className="grid gap-0.5 lg:gap-1.5"
                items={[...mockRecentItem]}
                onChange={handleChange}
                variant="white"
              />
            </div>
          </div>

          <div className="mt-7.5 w-full sm:mt-0">
            {/* 내 진행 상황 title */}
            <h3 className="mb-2.5 flex flex-wrap items-center pl-2 font-medium sm:text-base lg:text-lg">
              <img
                src="/icons/icon-progress.svg"
                alt="진행 아이콘"
                className="mr-2 h-8 w-8 lg:mr-3 lg:h-10 lg:w-10"
              />
              내 진행 상황
            </h3>
            {/* 퍼센트 */}
            <div className="h-46.5 rounded-[28px] bg-blue-200 bg-[url(/images/dashboard/obj-progress.png)] bg-[length:151px_auto] bg-[right_8px_bottom_-54px] bg-no-repeat p-0 shadow-[0_10px_40px_0_rgba(0,212,190,0.24)] transition-all sm:bg-[right_-24px_bottom_-54px] sm:p-6 lg:h-64 lg:rounded-[40px] lg:bg-[length:222px_auto] lg:bg-[right_-4px_bottom_-45px] lg:p-7.5 lg:hover:shadow-[0_10px_40px_0_rgba(0,212,190,0.24)]">
              {mounted && (
                <Progress
                  percent={40}
                  variant="large"
                  title={`체다치즈님의 진행도는`}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          {/* 목표별 할 일 title */}
          <h3 className="mb-2.5 flex flex-wrap items-center pl-2 font-medium sm:text-base lg:text-lg">
            <p className="flex flex-wrap items-center">
              <img
                src="/icons/icon-goal.svg"
                alt="목표 아이콘"
                className="mr-2 h-8 w-8 lg:mr-3 lg:h-10 lg:w-10"
              />
              목표별 할일
            </p>
          </h3>

          {/* 목표별 할 일 */}
          <div>
            {/* 하나의 할 일 */}
            <div
              className={`relative rounded-[28px] bg-white px-4 py-6.5 pb-11 shadow-[0_4px_4px_0_rgba(0,0,0,0.025)] transition-all sm:p-4 ${isOpen[0] ? "sm:pb-4" : "pb-13.5 sm:pb-7.5"} sm:pt-7.5 lg:rounded-[40px] lg:p-7.5 lg:hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.025)]`}>
              {/* 목표 */}
              <div className="flex items-start justify-between sm:items-center">
                <div
                  className={
                    "w-full pl-2.5 sm:w-auto lg:flex lg:items-center lg:pl-3.5"
                  }>
                  <h4 className="mb-3 truncate pr-20 font-semibold break-keep sm:w-105 sm:pr-5 sm:text-sm lg:mb-0 lg:w-60 lg:pr-7.5 lg:text-base">
                    자바스크립트로 웹 서비스 만들기
                  </h4>
                  <ProgressBar percent={60} />
                </div>
                <div className="flex pr-2.5">
                  <Button
                    onClick={() => onclick}
                    variant="outline-gray"
                    size="compact"
                    isDisabled={false}>
                    <p className="absolute top-6.75 right-6.25 flex w-18.5 items-center justify-center font-semibold sm:static sm:w-full">
                      <PlusIcon className="mr-1 h-4 w-4 sm:mr-1.5 sm:h-4.5 sm:w-4.5" />
                      할일추가
                    </p>
                  </Button>
                  <button
                    className={` ${isOpen[0] ? "rotate-180" : ""} hover:text-gray-650 absolute bottom-3.5 left-1/2 mt-2.5 ml-0 h-8 w-8 -translate-x-1/2 transform cursor-pointer rounded-full border border-gray-200 text-gray-600 hover:border-gray-300 sm:static sm:mt-0 sm:ml-4 sm:h-10 sm:w-10 sm:translate-x-0 sm:transform-none`}>
                    <ChevronDownIcon
                      width={20}
                      className="m-auto"
                    />
                  </button>
                </div>
              </div>
              {isOpen[0] && (
                <div className="mt-6.5 grid grid-cols-1 sm:mt-11 sm:grid-cols-2 sm:gap-2 lg:mt-4 lg:gap-8">
                  <div className="w-full rounded-2xl bg-[#FFF8E4] px-2 py-4.5 sm:h-64 sm:px-2.5 sm:py-4 lg:h-81 lg:rounded-3xl lg:p-6">
                    <h5 className="text-orange-250 mb-3.5 pl-2.5 text-sm font-bold sm:mb-1.5 sm:text-base lg:mb-3.75">
                      TO DO
                    </h5>
                    <ListItem
                      className="grid sm:gap-0.5 lg:gap-1"
                      items={todoItems}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full rounded-2xl px-2 py-4.5 sm:h-64 sm:px-2.5 sm:py-4 lg:h-81 lg:rounded-3xl lg:p-6">
                    <h5 className="pl-2.5 text-base font-bold text-gray-400 sm:mb-1.5 lg:mb-3.75">
                      DONE
                    </h5>
                    <ListItem
                      className="grid sm:gap-0.5 lg:gap-1"
                      items={doneItems}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>

            <div
              className={`relative mt-4 rounded-[28px] bg-white px-4 py-6.5 pb-11 shadow-[0_4px_4px_0_rgba(0,0,0,0.025)] transition-all sm:p-4 ${isOpen ? "sm:pb-4" : "pb-13.5 sm:pb-7.5"} sm:pt-7.5 lg:rounded-[40px] lg:p-7.5 lg:hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.025)]`}>
              {/* 목표 */}
              <div className="flex items-start justify-between sm:items-center">
                <div
                  className={
                    "w-full pl-2.5 sm:w-auto lg:flex lg:items-center lg:pl-3.5"
                  }>
                  <h4 className="mb-3 truncate pr-20 font-semibold break-keep sm:w-105 sm:pr-5 sm:text-sm lg:mb-0 lg:w-60 lg:pr-7.5 lg:text-base">
                    자바스크립트로 웹 서비스 만들기 길면 너가 어쩔건데 어쩔건데
                    어쩔건데 어절건데 ! ! !! ! ! ! !! !!
                  </h4>
                  <ProgressBar percent={60} />
                </div>
                <div className="flex pr-2.5">
                  <Button
                    onClick={() => onclick}
                    variant="outline-gray"
                    size="compact"
                    isDisabled={false}>
                    <p className="absolute top-6.75 right-6.25 flex w-18.5 items-center justify-center font-semibold sm:static sm:w-full">
                      <PlusIcon className="mr-1 h-4 w-4 sm:mr-1.5 sm:h-4.5 sm:w-4.5" />
                      할일추가
                    </p>
                  </Button>
                  <button
                    className={` ${isOpen ? "rotate-180" : ""} hover:text-gray-650 absolute bottom-3.5 left-1/2 mt-2.5 ml-0 h-8 w-8 -translate-x-1/2 transform cursor-pointer rounded-full border border-gray-200 text-gray-600 hover:border-gray-300 sm:static sm:mt-0 sm:ml-4 sm:h-10 sm:w-10 sm:translate-x-0 sm:transform-none`}>
                    <ChevronDownIcon
                      width={20}
                      className="m-auto"
                    />
                  </button>
                </div>
              </div>
              {isOpen[1] && (
                <div className="mt-6.5 grid grid-cols-1 sm:mt-11 sm:grid-cols-2 sm:gap-2 lg:mt-4 lg:gap-8">
                  <div className="w-full rounded-2xl bg-[#FFF8E4] px-2 py-4.5 sm:h-64 sm:px-2.5 sm:py-4 lg:h-81 lg:rounded-3xl lg:p-6">
                    <h5 className="text-orange-250 mb-3.5 pl-2.5 text-sm font-bold sm:mb-1.5 sm:text-base lg:mb-3.75">
                      TO DO
                    </h5>
                    <ListItem
                      className="grid sm:gap-0.5 lg:gap-1"
                      items={todoItems}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full rounded-2xl px-2 py-4.5 sm:h-64 sm:px-2.5 sm:py-4 lg:h-81 lg:rounded-3xl lg:p-6">
                    <h5 className="pl-2.5 text-base font-bold text-gray-400 sm:mb-1.5 lg:mb-3.75">
                      DONE
                    </h5>
                    <ListItem
                      className="grid sm:gap-0.5 lg:gap-1"
                      items={doneItems}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
