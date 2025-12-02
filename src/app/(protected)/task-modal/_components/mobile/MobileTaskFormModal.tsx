import MobileTaskModalLayout from "./MobileTaskFormLayout";
import InputModal from "@/components/common/popup-modal/InputModal";
import Button from "@/components/common/button/Button";
import { ReactNode } from "react";

interface MobileTaskFormModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  isConfirmDisabled: boolean;
}

export default function MobileTaskFormModal({
  title,
  children,
  onClose,
  onConfirm,
  isConfirmDisabled,
}: MobileTaskFormModalProps) {
  return (
    <MobileTaskModalLayout onClose={onClose}>
      <InputModal
        title={title}
        onClose={onClose}
        onConfirm={onConfirm}
        footer={
          <div className="mt-4 flex w-full gap-2">
            <Button
              variant="outline-gray"
              size="full"
              onClick={onClose}>
              취소
            </Button>
            <Button
              variant="primary"
              size="full"
              onClick={onConfirm}
              isDisabled={isConfirmDisabled}>
              확인
            </Button>
          </div>
        }>
        {children}
      </InputModal>
    </MobileTaskModalLayout>
  );
}
