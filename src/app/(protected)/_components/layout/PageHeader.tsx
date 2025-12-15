import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

interface PageHeaderProps {
  title: string;
  count?: number;
  mobileActions?: React.ReactNode;
  desktopActions?: React.ReactNode;
  desktopClassName?: string;
}

export default function PageHeader({
  title,
  count,
  mobileActions,
  desktopActions,
  desktopClassName,
}: PageHeaderProps) {
  return (
    <>
      <MobileHeader
        title={title}
        count={count}
        actions={mobileActions}
      />
      <DesktopHeader
        title={title}
        count={count}
        actions={desktopActions}
        className={desktopClassName}
      />
    </>
  );
}
