"use client";
import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface ModalContentProps {
  title: string;
  message?: string;
  isClosable?: boolean;
  children?: React.ReactNode;
  footer: React.ReactNode;
  titleAlign?: "center" | "left";
  onClose?: () => void;
}

export default function ModalContent({
  title,
  titleAlign = "center",
  message,
  isClosable = false,
  children,
  footer,
  onClose,
}: ModalContentProps) {
  return (
    <div className='relative flex flex-col items-center'>
      {isClosable && (
        <button
          onClick={onClose}
          type='button'
          aria-label='닫기'
          className='absolute top-0 right-0'>
          <XMarkIcon className='h-4 w-4 stroke-2 text-gray-600' />
        </button>
      )}
      <div
        className={clsx(
          "flex w-full flex-col gap-1",
          titleAlign === "center" && "items-center px-8 py-3",
          titleAlign === "left" && "items-start px-1",
        )}>
        <h2
          className={clsx(
            "font-medium text-black",
            titleAlign === "center" && "text-center",
            titleAlign === "left" && "text-left",
          )}>
          {title}
        </h2>
        {message && (
          <div className='flex items-center gap-1'>
            <ExclamationCircleIcon className='h-4 w-4 text-orange-500' />
            <p className='text-orange-350 text-xs md:text-sm'>{message}</p>
          </div>
        )}
      </div>
      {children && (
        <section className='mt-5 w-full min-w-70 md:mt-8'>{children}</section>
      )}
      <div className='mt-3 flex w-full gap-3'>{footer}</div>
    </div>
  );
}
