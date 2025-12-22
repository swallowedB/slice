import TextButton from "@/components/common/button/TextButton";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface DraftCalloutProps {
  onLoadDraft: () => void;
  onClose: () => void;
}

export default function DraftCallout({
  onLoadDraft,
  onClose,
}: DraftCalloutProps) {
  return (
    <div className="relative mb-7.5 flex flex-col gap-2 rounded-2xl bg-orange-50 p-4 sm:mb-0 sm:before:absolute sm:before:-top-1.5 sm:before:right-12 sm:before:h-4 sm:before:w-4 sm:before:rotate-45 sm:before:rounded-sm sm:before:bg-orange-50 sm:before:content-['']">
      <div className="flex items-start justify-between">
        <div className="text-sm text-gray-600">
          <p>임시 저장된 노트가 있어요.</p>
          <p>저장된 노트를 불러오시겠어요?</p>
        </div>
        <button
          type="button"
          aria-label="닫기"
          className="cursor-pointer text-gray-400"
          onClick={onClose}>
          <XMarkIcon
            strokeWidth={2.3}
            className="h-4.5 w-4.5"
          />
        </button>
      </div>
      <TextButton
        onClick={onLoadDraft}
        className="self-start">
        <div className="text-orange-250 flex items-center gap-1.5 text-sm font-medium">
          <span>불러오기</span>
          <ChevronRightIcon
            strokeWidth={2.8}
            className="h-3 w-3"
          />
        </div>
      </TextButton>
    </div>
  );
}
