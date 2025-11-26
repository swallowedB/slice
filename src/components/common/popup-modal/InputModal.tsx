"use client";
import Button from "../button/Button";
import BaseModal from "./BaseModal";
import ModalLayout from "./ModalLayout";

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
    <BaseModal onClose={onClose}>
      <ModalLayout
        title={title}
        titleAlign="left"
        isClosable={true}
        onClose={onClose}
        footer={
          <>
            <Button
              onClick={onConfirm}
              variant="primary"
              isDisabled={isConfirmDisabled}
            >{confirmText}</Button>
          </>
        }>
        {children}
      </ModalLayout>
    </BaseModal>
  );
}
