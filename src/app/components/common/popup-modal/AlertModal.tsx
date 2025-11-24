"use client"

import BaseModal from "./BaseModal";
import ModalLayout from "./ModalLayout";

interface AlertModalProps {
  title: string;
  message?: string;
  confirmText?: string;
}

export default function AlertModal({title, message, confirmText="확인"}:AlertModalProps) {
  return (
    <BaseModal>
      <ModalLayout
        title={title}
        titleAlign='center'
        message={message}
        footer={
          <>
            <button className="bg-orange-300 py-2 flex-1 rounded-md text-white " >{confirmText}</button>
          </>
        }
      >
    </ModalLayout>
    </BaseModal>
  );
}
