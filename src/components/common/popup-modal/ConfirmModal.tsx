"use client";

import Button from "../button/Button";
import BaseLayout from "./BaseLayout";
import DialogContent from "./DialogContent";

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
      <DialogContent
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
        }></DialogContent>
    </BaseLayout>
  );
}
