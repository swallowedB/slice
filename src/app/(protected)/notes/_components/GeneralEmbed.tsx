interface GeneralEmbedProps {
  url: string;
  title: string | null;
}

export function GeneralEmbed({ url, title }: GeneralEmbedProps) {
  return (
    <div className="relative h-[400px] w-full sm:h-[500px] lg:h-[600px]">
      <iframe
        src={url}
        className="absolute inset-0 h-full w-full"
        sandbox="allow-scripts allow-same-origin allow-popups"
        title={title ?? "링크 콘텐츠"}
      />
    </div>
  );
}
