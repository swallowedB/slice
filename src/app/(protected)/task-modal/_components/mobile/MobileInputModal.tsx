"use client";

import ModalContent from "@/components/common/popup-modal/ModalContent";
import MobileTaskModalLayout from "./MobileTaskFormLayout";

interface MobileInputModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  footer: React.ReactNode;
}

export default function MobileInputModal({
  title,
  children,
  onClose,
  footer,
}: MobileInputModalProps) {
  return (
    <MobileTaskModalLayout onClose={onClose}>
      <ModalContent
        title={title}
        titleAlign="left"
        isClosable
        onClose={onClose}
        footer={footer}>
        {children}
      </ModalContent>
    </MobileTaskModalLayout>
  );
}
