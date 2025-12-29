import { ReactNode, useState } from "react";

import InputModal from "@/components/common/popup-modal/InputModal";
import MobileInputModal from "./mobile/MobileDialog";
import ConfirmModal from "@/components/common/popup-modal/ConfirmModal";
import Button from "@/components/common/button/Button";

interface TodoFormLayoutProps {
  children?: ReactNode;
  isMobile: boolean;
  mode: "create" | "edit";
  sizeClass?: string;
  onClose: () => void;
  onConfirm: () => void;
  isConfirmDisabled: boolean;
}

export default function TodoFormLayout({
  children,
  isMobile,
  mode,
  onClose,
  onConfirm,
  isConfirmDisabled,
  sizeClass = "",
}: TodoFormLayoutProps) {
  const title = mode === "create" ? "할 일 생성" : "할 일 수정";
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = () => {
    onClose();
    setConfirmOpen(false);
  };

  const footer = (
    <div className="flex w-full gap-2 px-2 pb-4">
      <Button
        variant="outline-gray"
        size="full"
        onClick={() => setConfirmOpen(true)}>
        취소
      </Button>
      <Button
        variant="primary"
        size="full"
        onClick={onConfirm}
        isDisabled={isConfirmDisabled}>
        확인
      </Button>

      <ConfirmModal
        isOpen={confirmOpen}
        title="작성을 그만하시겠어요?"
        message="작성 중인 내용이 모두 삭제됩니다."
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );

  // 모바일 모달
  if (isMobile) {
    return (
      <MobileInputModal
        title={title}
        onClose={onClose}
        onConfirm={onConfirm}
        footer={footer}>
        {children}
      </MobileInputModal>
    );
  }

  // PC 모달
  return (
    <InputModal
      title={title}
      onClose={onClose}
      onConfirm={onConfirm}
      footer={footer}
      sizeClass={sizeClass}>
      {children}
    </InputModal>
  );
}
