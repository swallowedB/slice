import clsx from "clsx";

export interface DropdownProps {
    items: string[];
    variant?: "sidebar" | "menu";
    className?: string;
}

const DROPDOWN_STYLES = {
    sidebar: {
        wrapper: "w-full p-2 bg-white",
        item: "px-3 py-3 text-sm cursor-pointer",
    },
    menu: {
        wrapper:"w-32 p-1 bg-white",
        item: "px-0.5 py-2 text-sm cursor-pointer",
    },
} as const;

export default function Dropdown({ 
    items, 
    variant = "sidebar",
    className
}: DropdownProps) {
    
    const { wrapper, item } = DROPDOWN_STYLES[variant];

    const baseWrapper = "rounded-xl p-4 flex flex-col"
    const baseItem = "text-left rounded-lg hover:bg-orange-50 transition"

    const wrapperClass = clsx(baseWrapper, wrapper, className);

    const itemClass = clsx(baseItem, item);

    return(
        <div className={wrapperClass}>
        {items.map((text, index) => (
            <button
                key={index}
                type="button"
                className={itemClass}>
                {text}
            </button>
        ))}
        </div>
    );
}