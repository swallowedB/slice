"use client";

import DialogContent from "@/components/common/popup-modal/DialogContent";
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
      <DialogContent
        title={title}
        titleAlign="left"
        isClosable
        onClose={onClose}
        footer={footer}>
        {children}
      </DialogContent>
    </MobileDialogLayout>
  );
}
