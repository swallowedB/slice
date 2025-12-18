import { useMemo } from "react";
import { canEmbedUrl, getYouTubeEmbedUrl, isYouTubeUrl } from "../_utils/embed";

export function useEmbedInfo(url?: string) {
  return useMemo(() => {
    if (!url) return { isYouTube: false, canEmbed: false, embedUrl: "" };

    const isYouTube = isYouTubeUrl(url);
    const canEmbed = canEmbedUrl(url);
    const embedUrl = isYouTube ? getYouTubeEmbedUrl(url) : url;

    return { isYouTube, canEmbed, embedUrl };
  }, [url]);
}
