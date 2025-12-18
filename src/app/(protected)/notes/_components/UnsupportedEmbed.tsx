import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface UnsupportedEmbedProps {
  url: string;
}

export function UnsupportedEmbed({ url }: UnsupportedEmbedProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-6 rounded-full bg-gray-50 p-6">
        <ArrowTopRightOnSquareIcon className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="mb-2 text-base font-semibold text-gray-900">
        미리보기를 지원하지 않는 사이트입니다.
      </h3>
      <p className="mb-8 text-sm text-gray-600">새 탭에서 열어보세요.</p>
      <button
        onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
        className="bg-orange-250 inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-400">
        새 탭에서 열기
        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
