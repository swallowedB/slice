"use client";

import { Squares2X2Icon } from "@heroicons/react/16/solid";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import NavigationActions from "./_components/NavigationActions";
import NavigationGoalSection from "./_components/NavigationGoalSection";
import NavigationLink from "./_components/NavigationLink";
import NavigationLogout from "./_components/NavigationLogout";
import NavigationProfile from "./_components/NavigationProfile";

export default function NavigationDesktop() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <aside
      className={`sticky top-0 flex h-screen flex-col justify-between rounded-tr-4xl rounded-br-4xl bg-white  shadow-2xl transition-all duration-300 ${isCollapsed ? "w-24 sm:w-15" : "w-84 px-7.5 pt-8 pb-10"} `}>
      <section className="relative flex w-full flex-col">
        <button
          onClick={toggleCollapse}
          className={`absolute top-2 -right-2 z-20 cursor-pointer p-2 transition-transform duration-300 ${isCollapsed ? "-translate-x-5 translate-y-2" : "translate-x-0"} `}>
          <ChevronDoubleLeftIcon
            className={`h-5 w-5 text-gray-300 transition-transform duration-300 ${isCollapsed ? "rotate-180" : "rotate-0"} `}
            strokeWidth={2}
          />
        </button>
        {/*로고*/}
        <div
          className="my-10 flex items-center gap-4 pl-1 transition-all duration-300">
          <img
            src="/logo.svg"
            alt="Slice"
            className={`transition-all duration-300 ${isCollapsed ? "h-9 w-9 mt-6 ml-2" : "h-10 w-10"} `}
          />
          <p
            className={`text-2xl font-bold transition-opacity duration-300 lg:text-3xl ${
              isCollapsed ? "pointer-events-none opacity-0" : "opacity-100"
            }`}>
            SLICE
          </p>
        </div>

        {!isCollapsed && (
          <nav className="mb-1 flex w-full flex-col gap-2">
            <NavigationLink
              title="대시보드"
              href="/"
              icon={<Squares2X2Icon className="h-6 w-6" />}
              isActive={true}
            />

            <NavigationGoalSection />
          </nav>
        )}
      </section>

      {!isCollapsed && (
        <section className="flex flex-col">
          <NavigationActions />
          <NavigationProfile />
          <NavigationLogout />
        </section>
      )}
    </aside>
  );
}
