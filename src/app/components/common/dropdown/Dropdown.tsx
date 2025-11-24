// components/common/dropdown/sidebar-dropdown/SidebarDropdown.tsx
"use client";

import clsx from "clsx";

export interface DropdownProps {
    items: string[];
    variant?: "sidebar" | "menu";
    className?: string;
}

export default function Dropdown({ 
    items, 
    variant = "sidebar",
    className
}: DropdownProps) {
    return(
        <div className={clsx(
            "w-full rounded-xl bg-white p-4 flex flex-col",
            {
                "w-full p-4": variant === "sidebar",
                "w-36 p-2": variant === "menu",
            },
            className
        )}
        >
        {items.map((item, index) => (
            <button
                key={index}
                type="button"
                className={clsx(
                    "text-left rounded-lg hover:bg-orange-50 transition",
                    {
                      "px-3 py-3 text-sm": variant === "sidebar",
                      "px-2 py-2 text-sm": variant === "menu",
                    }
                  )}
                >
                {item}
            </button>
        ))}
    </div>
    )
};