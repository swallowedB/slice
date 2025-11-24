"use client"

import BaseModal from "./BaseModal";
import ModalLayout from "./ModalLayout";

interface ConfirModalProps {
  title: string;
  message?: string;
  confirmText?: string;
}

export default function ConfirmModal({title, message, confirmText="확인"}:ConfirModalProps) {
  return (
    <BaseModal>
      <ModalLayout
        title={title}
        message={message}
        footer={
          <>
            <button className="bg-orange-300 flex-1 py-3 rounded-md text-white" >취소</button>
            <button className="bg-orange-300 flex-1 rounded-md text-white " >{confirmText}</button>
          </>
        }
      >
    </ModalLayout>
    </BaseModal>
  );
}
