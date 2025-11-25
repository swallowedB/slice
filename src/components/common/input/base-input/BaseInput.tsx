"use client";

import clsx from "clsx";

export interface BaseInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  Icon?: React.ReactNode;
}

export default function BaseInput({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className,
  Icon,
}: BaseInputProps) {

  const inputClassName = clsx(
    "w-full rounded-xl px-4 h-[52px] text-sm outline-none",
    Icon && "pr-12",
    className
  );
  
  const rightIcon = Icon && (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10">
      {Icon}
    </div>
  );

  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={inputClassName}
      />
      {rightIcon}
    </div>
  );
}