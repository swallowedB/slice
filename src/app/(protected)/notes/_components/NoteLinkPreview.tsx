import { LinkMetadata } from "@/api/types/note";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface NoteLinkPreviewProps {
  linkMetadata: LinkMetadata;
}

export function NoteLinkPreview({ linkMetadata }: NoteLinkPreviewProps) {
  return (
    <div className="bg-gray-25 flex flex-col gap-1 rounded-xl px-4 py-3.5">
      <div className="flex justify-between">
        <div className="flex items-start gap-1">
          <img
            src={`https://www.google.com/s2/favicons?domain=${new URL(linkMetadata.url).hostname}&sz=32`}
            alt="favicon"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="h-6 w-6"
          />
          <h5 className="text-sm font-medium text-gray-700">
            {linkMetadata.title}
          </h5>
        </div>
        <button
          type="button"
          aria-label="삭제"
          className="cursor-pointer text-gray-400">
          <XMarkIcon
            strokeWidth={1.8}
            className="h-6 w-6"
          />
        </button>
      </div>
      <p className="text-xs font-normal text-gray-400">{linkMetadata.url}</p>
    </div>
  );
}
