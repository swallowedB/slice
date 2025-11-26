"use client";

import Button from "../button/Button";
import BaseLayout from "./BaseLayout";
import ModalContent from "./ModalContent";

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
  if (!isOpen) return null;
  return (
    <BaseLayout onClose={onClose}>
      <ModalContent
        title={title}
        message={message}
        onClose={onClose}
        footer={
          <>
            <Button
              onClick={onClose}
              variant="outline-gray">
              취소
            </Button>
            <Button
              onClick={onConfirm}
              variant="primary">
              {confirmText}
            </Button>
          </>
        }></ModalContent>
    </BaseLayout>
  );
}
