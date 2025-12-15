import clsx from "clsx";

export interface DropdownItem {
  text: string;
  onClick: () => void;
}

export interface DropdownProps {
  items: DropdownItem[];
  className?: string;
}

export default function Dropdown({ items, className }: DropdownProps) {
  const baseWrapper =
    "rounded-xl p-4 flex gap-y-2 flex-col shadow-[0px_4px_16px_-2px_rgba(0,0,0,0.1)]";
  const baseItem = "text-left rounded-lg text-sm hover:bg-orange-50 transition";

  const wrapperClass = clsx(baseWrapper, "w-32 px-3 py-2 bg-white", className);

  const itemClass = clsx(baseItem, "px-1 py-2 cursor-pointer");

  return (
    <div className={wrapperClass}>
      {items.map(({ text, onClick }) => (
        <button
          key={text}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
          }}
          className={itemClass}>
          {text}
        </button>
      ))}
    </div>
  );
}
