"use client";

import { FlagIcon } from "@heroicons/react/24/solid";
import NavigationGoalListItem from "./NavigationGoalListItem";
import NavigationLink from "./NavigationLink";

interface GoalNavItem {
  id: string;
  title: string;
  href: string;
}

const MOCK_GOALS: GoalNavItem[] = [
  { id: "1", title: "자바스크립트로 웹 서비스 만들기", href: "/goal/1" },
  { id: "2", title: "디자인 시스템 강의 듣기", href: "/goal/2" },
];

export default function NavigationGoalSection() {
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("입력값:", e.target.value);
  };

  return (
    <section>
      <NavigationLink
        title="목표"
        href="/goal/1"
        icon={<FlagIcon className="h-6 w-6 opacity-90" />}
        isActive={false}
      />

      {/* 목표 리스트 */}
      <ul className="flex flex-col items-start text-sm">
        {MOCK_GOALS.map((item) => (
          <NavigationGoalListItem
            key={item.href}
            {...item}
          />
        ))}
      </ul>

      {/* 새 목표 input */}
      <div className="mt-1">
        <input
          aria-label="새 목표 입력"
          autoFocus
          className="bg-orange-250/15 w-full border-b-2 border-orange-400 px-4 py-3 text-sm font-medium text-black outline-none placeholder:text-orange-400/60 focus:ring-0"
          placeholder="새 목표를 입력하고 Enter를 눌러주세요"
          onChange={onChangeInput}
        />
      </div>
    </section>
  );
}
