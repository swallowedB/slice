import Button from "@/components/common/button/Button";
import TextButton from "@/components/common/button/TextButton";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TaskFormContent from "../task-modal/_components/TaskFormContent";

export default function Taskbutton() {
  const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);
  const handleTaskOpen = () => {
    setIsOpenTaskModal(true);
  };

  const handleConfirm = () => {
    console.log("제출 데이터:");
    setIsOpenTaskModal(false);
  };
  return (
    <>
      <Button
        variant="outline-gray"
        size="compact"
        className="hidden sm:block"
        onClick={handleTaskOpen}>
        <p className="absolute top-7.25 right-5 flex w-18.5 items-center justify-center font-semibold sm:static sm:w-full">
          <PlusIcon className="mr-1 h-4 w-4 sm:mr-1.5 sm:h-4.5 sm:w-4.5" />
          할일추가
        </p>
      </Button>

      <TextButton
        variant="primary"
        className="block sm:hidden"
        onClick={() => console.log("mock up")}>
        <p className="absolute top-7.25 right-5 flex w-18.5 items-center justify-center font-semibold sm:static sm:w-full">
          <PlusIcon className="mr-1 h-4 w-4 sm:mr-1.5 sm:h-4.5 sm:w-4.5" />
          할일추가
        </p>
      </TextButton>

      {isOpenTaskModal && (
        <TaskFormContent
          mode="create"
          onClose={() => setIsOpenTaskModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
