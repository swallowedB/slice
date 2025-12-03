"use client";

import ModalBackground from "@/components/common/popup-modal/ModalBackground";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NoteTitleView from "./NoteTitleView";
import Badge from "./Badge";
import { useEffect, useState } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import clsx from "clsx";

export default function NoteDetailModal({
  isOpen,
  noteId,
  onClose,
}: {
  isOpen: boolean;
  noteId: number | null;
  onClose: () => void;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { isDesktop } = useDeviceSize();

  const handleClose = () => {
    setIsAnimating(false);

    if (!isDesktop) {
      return onClose();
    }

    setTimeout(onClose, 300);
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (isOpen) {
      timerId = setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      <ModalBackground />
      <div
        className={clsx(
          "fixed inset-y-0 right-0 left-0 z-1000 bg-white px-4 pt-12 pb-4",
          "translate-x-0 transition-transform duration-300 ease-out",
          "sm:px-10 sm:pt-18 sm:pb-10 lg:left-auto lg:w-5xl lg:rounded-tl-4xl lg:rounded-bl-4xl lg:pt-20",
          !isAnimating && "lg:translate-x-full",
        )}>
        <button
          type="button"
          aria-label="닫기"
          onClick={handleClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-400 sm:top-10 sm:right-10">
          <XMarkIcon
            strokeWidth={1.8}
            className="h-6 w-6"
          />
        </button>
        <NoteTitleView
          title="프로그래밍과 데이터 in JavaScript"
          className="text-lg sm:text-2xl"
        />
        <div className="mt-7.5 flex flex-col gap-1 sm:gap-2">
          <div className="flex text-sm">
            <h4 className="flex min-w-15 items-center justify-start gap-1 text-gray-400">
              <img
                src="/icons/flag/flag-outline-gray.svg"
                alt="목표 아이콘"
                className="h-4.5 w-4.5"
              />
              <span className="font-medium">목표</span>
            </h4>
            <p className="font-normal text-gray-700">
              자바스크립트로 웹 서비스 만들기
            </p>
          </div>
          <div className="flex text-sm">
            <h4 className="flex min-w-15 items-center justify-start gap-1 text-gray-400">
              <img
                src="/icons/todo/todo-outline-gray.svg"
                alt="체크 아이콘"
                className="h-4.5 w-4.5"
              />
              <span className="font-medium">할 일</span>
            </h4>
            <div className="flex items-center gap-1 sm:gap-2">
              <Badge isDone={false} />
              <p className="font-normal text-gray-700">
                자바스크립트 기초 챕터1 듣기
              </p>
            </div>
          </div>
          <div className="flex text-sm">
            <h4 className="flex min-w-15 items-center justify-start gap-1.5 text-gray-400">
              <img
                src="/icons/icon-calendar-gray.svg"
                alt="체크 아이콘"
                className="h-4 w-4"
              />
              <span className="font-medium">날짜</span>
            </h4>
            <p className="font-normal text-gray-700">2025. 11. 23</p>
          </div>
        </div>
      </div>
    </>
  );
}
