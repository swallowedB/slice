"use client";

import TodoFormContent, {
  TodoFormData,
} from "@/app/(protected)/_components/todo-modal/_components/TodoFormContent";
import { useState } from "react";
import NavigationActions from "./_components/NavigationActions";
import NavigationLogout from "./_components/NavigationLogout";
import NavigationMenu from "./_components/NavigationMenu";
import NavigationProfile from "./_components/NavigationProfile";

interface NavigationMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function NavigationMobileDrawer({
  isOpen,
  onClose,
  className,
}: NavigationMobileDrawerProps) {
  const [newGoalInputSignal, setNewGoalInputSignal] = useState(0);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  const onClickNewGoal = () => {
    setNewGoalInputSignal((v) => v + 1);
  };

  const onClickNewTodo = () => {
    onClose();
    setIsTodoModalOpen(true);
  };
  const handleCloseTodoModal = () => setIsTodoModalOpen(false);
  const handleConfirmTodoModal = (data: TodoFormData) => {
    setIsTodoModalOpen(false);
  };

  return (
    <>
      {isOpen && (<div
        className={`fixed inset-0 z-400 transition-all duration-100 ${className}`}>
        <aside className="absolute inset-0 flex h-full w-full flex-col bg-white shadow-2xl">
          {/* 상단 헤더 영역 */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <button
              className="cursor-pointer text-sm text-gray-500"
              onClick={onClose}>
              닫기
            </button>
          </div>

          {/* 컨텐츠 영역 */}
          <section className="flex h-full flex-col justify-between px-5 py-6">
            <NavigationMenu newGoalInputSignal={newGoalInputSignal} />

            <div>
              <NavigationActions
                onClickNewGoal={onClickNewGoal}
                onClickNewTodo={onClickNewTodo}
              />
              <NavigationProfile />
              <NavigationLogout />
            </div>
          </section>
        </aside>
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
