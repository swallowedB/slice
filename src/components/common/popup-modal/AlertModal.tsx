"use client";
import Button from "../button/Button";
import BaseLayout from "./BaseLayout";
import DialogContent from "./DialogContent";

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
  if (!isOpen) return null;
  return (
    <BaseLayout onClose={onClose}>
      <DialogContent
        title={title}
        titleAlign="center"
        message={message}
        footer={
          <>
            <Button
              onClick={onClose}
              variant="primary">
              {confirmText}
            </Button>
          </>
        }></DialogContent>
    </BaseLayout>
  );
}
