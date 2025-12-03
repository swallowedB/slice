"use client";
import BaseLayout from "./BaseLayout";
import ModalContent from "./ModalContent";

interface InputModalProps {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
  sizeClass: string;
}

export default function InputModal({
  title,
  children,
  onClose,
  footer,
  sizeClass,
}: InputModalProps) {
  return (
    <BaseLayout
      onClose={onClose}
      sizeClass={sizeClass}>
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
