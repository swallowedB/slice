import { useState, useEffect } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";

import Portal from "../../../../components/common/dropdown/dropdown-portal/Portal";
import Dropdown, { DropdownItem } from "@/components/common/dropdown";

interface DropdownPortalProps {
  anchorRect: DOMRect;
  items: DropdownItem[];
  onClose: () => void;
}
export default function DropdownPortal({
  anchorRect,
  items,
  onClose,
}: DropdownPortalProps) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const { isMobile } = useDeviceSize();

  useEffect(() => {
    if (!anchorRect) return;

    if (isMobile) {
      setStyle({
        position: "fixed",
        top: anchorRect.bottom + window.scrollY + 4,
        left: anchorRect.right + window.scrollX - 90,
        zIndex: 1000,
      });
    } else {
      setStyle({
        position: "absolute",
        top: anchorRect.bottom + window.scrollY + 4,
        left: anchorRect.right + window.scrollX - 20,
        zIndex: 1000,
      });
    }
  }, [anchorRect, isMobile]);

  return (
    <Portal>
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div style={style}>
        <Dropdown items={items} />
      </div>
    </Portal>
  );
}
