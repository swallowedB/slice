"use client";
import BaseLayout from "./BaseLayout";
import ModalContent from "./ModalContent";

interface InputModalProps {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export default function InputModal({
  title,
  children,
  onClose,
  footer,
}: InputModalProps) {
  return (
    <BaseLayout onClose={onClose}>
      <ModalContent
        title={title}
        titleAlign="left"
        isClosable={true}
        onClose={onClose}
        footer={footer}>
        {children}
      </ModalContent>
    </BaseLayout>
  );
}
