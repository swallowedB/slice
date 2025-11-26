"use client";
import Button from "../button/Button";
import BaseLayout from "./BaseLayout";
import ModalContent from "./ModalContent";

interface InputModalProps {
  title: string;
  confirmText?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  isConfirmDisabled?: boolean;
}

export default function InputModal({
  title,
  confirmText = "확인",
  children,
  isOpen,
  onClose,
  onConfirm,
  isConfirmDisabled = true,
}: InputModalProps) {
  if (!isOpen) return null;
  return (
    <BaseLayout onClose={onClose}>
      <ModalContent
        title={title}
        titleAlign="left"
        isClosable={true}
        onClose={onClose}
        footer={
          <>
            <Button
              onClick={onConfirm}
              variant="primary"
              isDisabled={isConfirmDisabled}>
              {confirmText}
            </Button>
          </>
        }>
        {children}
      </ModalContent>
    </BaseLayout>
  );
}
