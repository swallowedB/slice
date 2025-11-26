"use client";
import Button from "../button/Button";
import BaseLayout from "./BaseLayout";
import ModalContent from "./ModalContent";

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
      <ModalContent
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
        }></ModalContent>
    </BaseLayout>
  );
}
