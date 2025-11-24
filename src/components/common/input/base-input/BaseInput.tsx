"use client";

import clsx from "clsx";

export interface BaseInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  background?: "sky" | "orange";
  className?: string;
  Icon?: React.ReactNode;
}

export default function BaseInput({
  value,
  onChange,
  placeholder = "",
  type = "text",
  background = "sky",
  className,
  Icon,
}: BaseInputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "w-full rounded-xl px-4 h-[52px] text-sm outline-none",
          {
            "bg-blue-50": background === "sky",
            "bg-orange-100": background === "orange",
          },
          Icon && "pr-12",
          className
        )}
      />

      {/* 아이콘 */}
      {Icon && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10">
          {Icon}
        </div>
      )}
    </div>
  );
}