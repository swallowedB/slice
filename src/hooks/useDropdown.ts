import { useEffect, useRef, useState } from "react";

export function useDropdown<T extends HTMLElement = HTMLButtonElement>() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<T | null>(null);

  const toggle = (e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    setOpen((prev) => !prev);
  };

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const handleClose = (e: MouseEvent | KeyboardEvent) => {
      if ("key" in e && e.key === "Escape") {
        close();
        return;
      }

      const target = e.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current?.contains(target) &&
        triggerRef.current &&
        !triggerRef.current?.contains(target)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClose);
    document.addEventListener("keydown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
      document.removeEventListener("keydown", handleClose);
    };
  }, [open]);

  return {
    open,
    toggle,
    close,
    dropdownRef,
    triggerRef,
  };
}
