import clsx from "clsx";

interface NoteTitleViewProps {
  title: string;
  className?: string;
}

export default function NoteTitleView({
  title,
  className,
}: NoteTitleViewProps) {
  return (
    <h3 className="flex min-w-0 items-center gap-3">
      <img
        src="/icons/icon-note.svg"
        alt="노트 아이콘"
        className="h-8 w-8 lg:h-10 lg:w-10"
      />
      <span className={clsx("flex-1 truncate font-semibold", className)}>
        {title}
      </span>
    </h3>
  );
}
