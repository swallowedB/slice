import clsx from "clsx";

export interface DropdownProps {
    items: string[];
    variant?: "sidebar" | "menu";
    className?: string;
}

const DROPDOWN_STYLES = {
    sidebar: {
        wrapper: "w-full p-4",
        item: "px-3 py-3 text-sm",
    },
    menu: {
        wrapper:"w-36 p-2",
        item: "px-2 py-2 text-sm",
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