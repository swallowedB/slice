interface YouTubeEmbedProps {
  url: string;
  title: string | null;
}

export function YouTubeEmbed({ url, title }: YouTubeEmbedProps) {
  return (
    <div className="relative aspect-video max-h-[400px] w-full sm:max-h-[500px] lg:max-h-[600px]">
      <iframe
        src={url}
        className="absolute inset-0 h-full w-full"
        title={title ?? "YouTube Video"}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
      />
    </div>
  );
}
