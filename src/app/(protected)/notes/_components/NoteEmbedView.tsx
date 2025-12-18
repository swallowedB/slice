import { XMarkIcon } from "@heroicons/react/24/outline";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { GeneralEmbed } from "./GeneralEmbed";
import { UnsupportedEmbed } from "./UnsupportedEmbed";

interface NoteEmbedViewProps {
  url: string;
  title: string | null;
  isYouTube: boolean;
  canEmbed: boolean;
  onClose: () => void;
}

export function NoteEmbedView({
  url,
  title,
  isYouTube,
  canEmbed,
  onClose,
}: NoteEmbedViewProps) {
  const showYouTubeEmbed = isYouTube;
  const showGeneralEmbed = !isYouTube && canEmbed;
  const showUnsupportedEmbed = !isYouTube && !canEmbed;

  return (
    <div className="mt-5 border border-gray-100">
      <div className="bg-gray-25 flex justify-end">
        <button
          type="button"
          aria-label="닫기"
          className="cursor-pointer pr-1 text-gray-200 lg:py-1"
          onClick={onClose}>
          <XMarkIcon
            strokeWidth={1.8}
            className="h-6 w-6"
          />
        </button>
      </div>
      {showYouTubeEmbed && (
        <YouTubeEmbed
          url={url}
          title={title}
        />
      )}
      {showGeneralEmbed && (
        <GeneralEmbed
          url={url}
          title={title}
        />
      )}
      {showUnsupportedEmbed && <UnsupportedEmbed url={url} />}
    </div>
  );
}
