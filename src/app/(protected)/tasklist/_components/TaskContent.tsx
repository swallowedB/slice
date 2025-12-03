"use client";

import { useState } from "react";
import GoalSelect from "./GoalSelect";
import ListItem from "@/components/common/list/list-item/ListItem";

const mockGoals = [
  "자바스크립트로 웹 서비스 만들기",
  "디자인 시스템 강의 듣기",
];
const mockTasks = [
  { id: 1, label: "사용자 데이터 렌더링 구현", checked: false },
  { id: 2, label: "로그인/회원가입 폼 만들기", checked: true, note: true },
  { id: 3, label: "폴더 구조 세팅", checked: false, file: true },
];

export default function TaskContent() {
  const [goal, setGoal] = useState("");
  const [tasks, setTasks] = useState(mockTasks);

  const handleChange = (id: number) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };
  return (
    <div className="h-[640px] w-[343px] rounded-3xl bg-white px-4 py-4 pb-8 lg:h-[916px] lg:w-[636px] lg:px-6 lg:pt-6 lg:pb-10 2xl:h-[796px] 2xl:w-[720px] 2xl:rounded-2xl 2xl:px-8 2xl:pt-8 2xl:pb-44">
      <GoalSelect
        goals={mockGoals}
        title="목표를 선택하세요."
        value={goal}
        onSelect={(g) => setGoal(g)}
      />
      <div className="mt-4">
        <ListItem
          items={mockTasks}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
