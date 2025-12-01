import clsx from "clsx";

export interface DropdownProps {
  items: string[];
  variant?: "sidebar" | "menu";
  onSelect?: (value: string) => void;
  className?: string;
}

const DROPDOWN_STYLES = {
  sidebar: {
    wrapper: "w-full p-2 bg-white",
    item: "px-4 pt-3 pb-4 cursor-pointer",
  },
  menu: {
    wrapper: "w-32 px-3 py-2 bg-white",
    item: "px-1 py-2 text-sm cursor-pointer",
  },
} as const;

export default function Dropdown({
  items,
  variant = "sidebar",
  className,
  onSelect,
}: DropdownProps) {
  const { wrapper, item } = DROPDOWN_STYLES[variant];

  const baseWrapper =
    "rounded-xl p-4 gap-y-2 flex flex-col shadow-[0px_4px_16px_-2px_rgba(0,0,0,0.1)";
  const baseItem = "text-left rounded-lg hover:bg-orange-50 transition";

  const wrapperClass = clsx(baseWrapper, wrapper, className);

  const itemClass = clsx(baseItem, item);

  return (
    <div className={wrapperClass}>
      {items.map((text, index) => (
        <button
          key={index}
          type="button"
          className={itemClass}
          onClick={() => onSelect?.(text)}>
          {text}
        </button>
      ))}
    </div>
  );
}
