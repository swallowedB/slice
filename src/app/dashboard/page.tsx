"use client";

import ListItem from "@/components/common/list/list-item/ListItem";
import { ListItemType } from "@/components/common/list/list-item/listItem.types";
import Link from "next/link";
import Progress from "../../components/progress/Progress";
import ProgressBar from "./_components/ProgressBar";
import Button from "@/components/common/button/Button";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// 최근 등록한 할일
const mockRecentItem: ListItemType[] = [
  { id: 1, label: "사용자 데이터 렌더링 구현", checked: false, link: true },
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
      <h2 className="color-gray-800 mb-8.5 pl-2 text-2xl font-semibold">
        체다치즈님의 대시보드
      </h2>
      {/* 최근 등록한 할일 */}
      <section>
        <div>
          {/* 최근 등록한 할일 title */}
          <div>
            <h3 className="flex items-center pl-2">
              <i className="mr-3 flex h-10 w-10 rounded-xl bg-[#ffd0aa]">
                {/* <ClipboardDocumentListIcon
                  width={24}
                  className="m-auto"
                /> */}
              </i>
              최근 등록한 할일
            </h3>
            <Link href={"./page.tsx"}>모두 보기</Link>
          </div>
          {/* 최근 등록한 할일 */}
          <div>
            <ListItem
              items={[...mockRecentItem]}
              onChange={handleChange}
              variant="white"
            />
          </div>
          <div>
            {/* 내 진행 상황 title */}
            <h3 className="flex items-center pl-2">
              <i className="mr-3 flex h-10 w-10 rounded-xl bg-blue-100">
                {/* <ChartPieIcon
                  width={24}
                  className="m-auto"
                /> */}
              </i>
              내 진행 상황
            </h3>
            {/* 퍼센트 */}
            <div>
              <Progress
                percent={40}
                className="large"
                title={`체다치즈님의 진행도는`}
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          {/* 목표별 할 일 title */}
          <h3 className="flex items-center pl-2">
            <i className="mr-3 flex h-10 w-10 rounded-xl bg-blue-100">
              {/* <ChartPieIcon
                width={24}
                className="m-auto"
              /> */}
            </i>
            목표별 할일
          </h3>
          {/* 목표별 할 일 */}
          <div>
            {/* 하나의 할 일 */}
            <div>
              {/* 목표 */}
              <div>
                <h4>자바스크립트로 웹 서비스 만들기</h4>
                <ProgressBar percent={60} />
              </div>
              <div>
                {/* 우선 버튼 스킵 */}
                <Button
                  onClick={() => onclick}
                  variant="outline-gray"
                  size="compact"
                  isDisabled={false}>
                  아이콘 할일추가{" "}
                </Button>
                {/* <Button
                  onClick={() => onclick}
                  variant="outline-gray"
                  size="compact"
                  isDisabled={false}>
                  아이콘
                </Button> */}
                <button className="h-5x w-5">
                  <ChevronDownIcon />
                </button>
              </div>
            </div>
            <div>
              <div>
                <h5>TO DO</h5>
                <ListItem
                  items={todoItems}
                  onChange={handleChange}
                />
              </div>
              <div>
                <h5>DONE</h5>
                <ListItem
                  items={doneItems}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
