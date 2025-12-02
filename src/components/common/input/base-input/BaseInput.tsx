"use client";

import clsx from "clsx";

export type InputType = "text" | "email" | "password" | "url" | "file";

export interface BaseInputProps {
  name?: string;
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: InputType;
  className?: string;
  Icon?: React.ReactNode;
}

export default function BaseInput({
  name,
  id,
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
    className,
  );

  const rightIcon = Icon && (
    <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer">
      {Icon}
    </div>
  );

  return (
    <div className="relative w-full">
      <input
        name={name}
        id={id}
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
