"use client";
import BaseModal from "./BaseModal";
import ModalLayout from "./ModalLayout";

interface InputModalProps {
  title: string;
  confirmText?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; 
  children: React.ReactNode;
}

export default function InputModal({
  title,
  confirmText = "확인",
  children,
  isOpen,
  onClose,
  onConfirm,
}: InputModalProps) {
  if (!isOpen) return null;
  return (
    <BaseModal onClose={onClose}>
      <ModalLayout
        title={title}
        titleAlign='left'
        isClosable={true}
        onClose={onClose}
        footer={
          <>
            <button
              onClick={onConfirm}
              className='flex-1 rounded-md bg-orange-300 py-2 text-white'>
              {confirmText}
            </button>
          </>
        }>
        {children}
      </ModalLayout>
    </BaseModal>
  );
}
