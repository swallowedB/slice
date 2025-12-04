"use client";

import ModalContent from "@/components/common/popup-modal/ModalContent";
import MobileDialogLayout from "./MobileDialogLayout";

interface MobileDialogProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  footer: React.ReactNode;
}

export default function MobileDialog({
  title,
  children,
  onClose,
  footer,
}: MobileDialogProps) {
  return (
    <MobileDialogLayout onClose={onClose}>
      <ModalContent
        title={title}
        titleAlign="left"
        isClosable
        onClose={onClose}
        footer={footer}>
        {children}
      </ModalContent>
    </MobileDialogLayout>
  );
}
