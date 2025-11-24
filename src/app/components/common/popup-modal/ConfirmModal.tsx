"use client";

import BaseModal from "./BaseModal";
import ModalLayout from "./ModalLayout";

interface ConfirModalProps {
  title: string;
  message?: string;
  confirmText?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmText = "확인",
  isOpen,
  onClose,
  onConfirm,
}: ConfirModalProps) {
  if(!isOpen) return null;
  return (
    <BaseModal onClose={onClose}>
      <ModalLayout
        title={title}
        message={message}
        onClose={onClose}
        footer={
          <>
            <button
              onClick={onClose}
              className='flex-1 rounded-md bg-orange-300 py-3 text-white'>
              취소
            </button>
            <button
              onClick={onConfirm} 
              className='flex-1 rounded-md bg-orange-300 text-white'>
              {confirmText}
            </button>
          </>
        }></ModalLayout>
    </BaseModal>
  );
}
