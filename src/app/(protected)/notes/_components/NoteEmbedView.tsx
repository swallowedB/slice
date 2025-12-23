import { XMarkIcon } from "@heroicons/react/24/outline";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { GeneralEmbed } from "./GeneralEmbed";
import { UnsupportedEmbed } from "./UnsupportedEmbed";
import { useEmbedInfo } from "../_hooks/useEmbedInfo";

interface NoteEmbedViewProps {
  url: string;
  title: string | null;
  onClose: () => void;
}

export function NoteEmbedView({ url, title, onClose }: NoteEmbedViewProps) {
  const { isYouTube, canEmbed, embedUrl } = useEmbedInfo(url);

  return (
    <div className="border border-gray-100">
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
      {isYouTube && (
        <YouTubeEmbed
          url={embedUrl}
          title={title}
        />
      )}
      {!isYouTube && canEmbed && (
        <GeneralEmbed
          url={embedUrl}
          title={title}
        />
      )}
      {!isYouTube && !canEmbed && <UnsupportedEmbed url={embedUrl} />}
    </div>
  );
}
