"use client";
import { useState } from "react";
import InputModal from "./components/common/popup-modal/InputModal";
import ConfirmModal from "./components/common/popup-modal/ConfirmModal";
import AlertModal from "./components/common/popup-modal/AlertModal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>모달열기</button>
      <ConfirmModal
        title='정말 삭제하시겠어요?'
        message='삭제된 목표는 복구할 수 없습니다.'
        isOpen={isOpen}
        onClose={handleClick}
      />
      {/* <AlertModal
        title='확인하셨습니까?'
        isOpen={isOpen}
        onClose={handleClick}
      /> */}
      {/* <InputModal
        title='링크 업로드'
        isOpen={isOpen}
        onClose={handleClick}>
        <input className='w-full flex-1 rounded-md bg-gray-100 py-2' />
      </InputModal> */}
    </div>
  );
}
