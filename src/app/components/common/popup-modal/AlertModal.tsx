"use client";

import BaseModal from "./BaseModal";
import ModalLayout from "./ModalLayout";

interface AlertModalProps {
  title: string;
  message?: string;
  confirmText?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AlertModal({
  title,
  message,
  confirmText = "확인",
  isOpen,
  onClose,
}: AlertModalProps) {
  if(!isOpen) return null;
  return (
    <BaseModal onClose={onClose}>
      <ModalLayout
        title={title}
        titleAlign='center'
        message={message}
        footer={
          <>
            <button
              onClick={onClose} 
              className='flex-1 rounded-md bg-orange-300 py-2 text-white'>
              {confirmText}
            </button>
          </>
        }></ModalLayout>
    </BaseModal>
  );
}
