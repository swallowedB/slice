const EMBEDDABLE_DOMAINS = [
  "youtube.com",
  "youtu.be",
  "codesandbox.io",
  "stackblitz.com",
  "jsfiddle.net",
  "wikipedia.org",
];

export function canEmbedUrl(url: string) {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    return EMBEDDABLE_DOMAINS.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
    );
  } catch {
    return false;
  }
}

export function isYouTubeUrl(url: string) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

export function getYouTubeEmbedUrl(url: string) {
  const videoId = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s?]+)/,
  )?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}
