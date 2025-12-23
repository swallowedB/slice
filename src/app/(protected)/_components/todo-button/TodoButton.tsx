import Button from "@/components/common/button/Button";
import TextButton from "@/components/common/button/TextButton";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TodoFormContent from "../todo-modal/_components/TodoFormContent";

export default function TodoButton({ className }: { className?: string }) {
  const [isOpenTodoModal, setIsOpenTodoModal] = useState(false);
  const handleTodoOpen = () => {
    setIsOpenTodoModal(true);
  };

  const handleConfirm = () => {
    console.log("제출 데이터:");
    setIsOpenTodoModal(false);
  };
  return (
    <>
      <Button
        variant="outline-orange"
        size="compact"
        className="hidden sm:block"
        onClick={handleTodoOpen}>
        <p className="absolute top-7.25 right-5 flex w-18.5 items-center justify-center font-semibold sm:static sm:w-full">
          <PlusIcon className="mr-1 h-4 w-4 sm:mr-1.5 sm:h-4.5 sm:w-4.5" />할 일
          추가
        </p>
      </Button>

      <TextButton
        variant="primary"
        className="block sm:hidden"
        onClick={handleTodoOpen}>
        <p
          className={`${className} absolute right-5 flex w-18.5 items-center justify-center font-semibold sm:static sm:w-full`}>
          <PlusIcon className="mr-1 h-4 w-4 sm:mr-1.5 sm:h-4.5 sm:w-4.5" />할 일
          추가
        </p>
      </TextButton>

      {isOpenTodoModal && (
        <div className="z-1000">
          <TodoFormContent
            mode="create"
            onClose={() => setIsOpenTodoModal(false)}
            onConfirm={handleConfirm}
          />
        </div>
      )}
    </>
  );
}
