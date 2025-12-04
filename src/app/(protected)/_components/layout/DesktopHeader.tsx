import clsx from "clsx";
import React from "react";

interface DesktopHeaderProps {
  title: string;
  count?: number;
  actions?: React.ReactNode;
  className?: string;
}

export default function DesktopHeader({
  title,
  count,
  actions,
  className,
}: DesktopHeaderProps) {
  return (
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
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}
