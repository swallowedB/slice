"use client";

import Button from "../button/Button";
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
  if (!isOpen) return null;
  return (
    <BaseModal onClose={onClose}>
      <ModalLayout
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
        }></ModalLayout>
    </BaseModal>
  );
}
