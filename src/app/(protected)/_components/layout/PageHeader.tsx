import clsx from "clsx";
import MobileHeader from "./MobileHeader";

interface PageHeaderProps {
  title: string;
  count?: number;
  mobileActions?: React.ReactNode;
  desktopActions?: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  count,
  mobileActions,
  desktopActions,
  className,
}: PageHeaderProps) {
  return (
    <>
      <MobileHeader
        title={title}
        count={count}
        actions={mobileActions}
      />
      <div
        className={clsx(
          "hidden items-center justify-between sm:flex",
          className,
        )}>
        <h2 className="leading-9.5 text-black sm:text-2xl sm:font-semibold">
          {title}
          {count !== undefined && (
            <span className="pl-2 text-orange-400">{count}</span>
          )}
        </h2>
        <div className="flex items-center gap-2">{desktopActions}</div>
      </div>
    </>
  );
}
