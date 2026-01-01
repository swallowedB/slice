"use client";

import TodoFormContent from "@/app/(protected)/_components/todo-modal/_components/TodoFormContent";
import ModalBackground from "@/components/common/popup-modal/ModalBackground";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import NavigationActions from "./_components/NavigationActions";
import NavigationLogout from "./_components/NavigationLogout";
import NavigationMenu from "./_components/NavigationMenu";
import NavigationProfile from "./_components/NavigationProfile";

export default function NavigationDesktop() {
  const router = useRouter();
  const { isTablet } = useDeviceSize();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoalInputSignal, setNewGoalInputSignal] = useState(0);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (isTablet) {
      setIsModalOpen(false);
      setIsCollapsed(true);
    } else {
      setIsModalOpen(false);
      setIsCollapsed(false);
    }
  }, [isTablet]);

  useEffect(() => {
    const prev = prevPathnameRef.current;

    if (prev !== pathname) {
      if (isTablet && isModalOpen) {
        closeModal();
      }
      prevPathnameRef.current = pathname;
    }
  }, [pathname, isTablet, isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
    setIsCollapsed(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsCollapsed(true);
  };

  const onClickNewGoal = () => {
    setNewGoalInputSignal((v) => v + 1);
  };

  const onClickNewTodo = () => {
    setIsTodoModalOpen(true);
  };
  const handleCloseTodoModal = () => setIsTodoModalOpen(false);
  const handleConfirmTodoModal = () => {
    setIsTodoModalOpen(false);
  };

  const toggleCollapse = () => {
    if (!isTablet) {
      setIsCollapsed((prev) => !prev);
    } else {
      isModalOpen ? closeModal() : openModal();
    }
  };

  const sidebar = (
    <aside
      className={`flex h-full flex-col justify-between rounded-tr-4xl rounded-br-4xl bg-white shadow-2xl transition-all duration-300 ${isCollapsed ? "w-24 sm:w-15" : "w-84 px-7.5 pt-8 pb-10"} `}>
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
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="my-10 flex cursor-pointer items-center gap-4 pl-1 transition-all duration-300">
          <img
            src="/logo.svg"
            alt="Slice"
            className={`transition-all duration-300 ${isCollapsed ? "mt-6 ml-2 h-9 w-9" : "h-10 w-10"} `}
          />
          <p
            className={`text-2xl font-bold transition-opacity duration-300 lg:text-3xl ${
              isCollapsed ? "pointer-events-none opacity-0" : "opacity-100"
            }`}>
            SLICE
          </p>
        </button>

        {!isCollapsed && (
          <NavigationMenu newGoalInputSignal={newGoalInputSignal} />
        )}
      </section>

      {!isCollapsed && (
        <section className="flex flex-col">
          <NavigationActions
            onClickNewGoal={onClickNewGoal}
            onClickNewTodo={onClickNewTodo}
          />
          <NavigationProfile />
          <NavigationLogout />
        </section>
      )}
    </aside>
  );

  return (
    <>
      {!isTablet && sidebar}

      {isTablet && !isModalOpen && sidebar}

      {isTablet && isModalOpen && (
        <div className="fixed inset-0 z-900 transition-all duration-100">
          <ModalBackground onClick={closeModal} />
          <div className="absolute inset-y-0 left-0 z-910 flex h-full">
            {sidebar}
          </div>
        </div>
      )}

      {isTodoModalOpen && (
        <TodoFormContent
          mode="create"
          onClose={handleCloseTodoModal}
          onConfirm={handleConfirmTodoModal}
        />
      )}
    </>
  );
}
