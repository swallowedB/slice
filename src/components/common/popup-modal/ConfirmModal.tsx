"use client";

import Button from "../button/Button";
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
          <Button
              onClick={onClose}
              variant="outline-gray"
          >
            취소
          </Button>
          <Button
              onClick={onConfirm} 
              variant="primary"
          >
              {confirmText}
          </Button>
          </>
        }></ModalLayout>
    </BaseModal>
  );
}
