"use client";

import BaseInput from "@/components/common/input/base-input/BaseInput";
import clsx from "clsx";

interface AttachmentSectionProps {
  type: "file" | "link";
  value: string | File | null;
  placeholder: string;
  icon: React.ReactNode;
  onChange?: (v: string | File | null) => void;
}

export default function AttachmentSection({
  type,
  value,
  placeholder,
  icon,
  onChange,
}: AttachmentSectionProps) {
  const ATTACHMENT_CLASS =
    "h-14 w-full rounded-xl border border-dashed border-gray-200 bg-[#FAFAFA] pl-10 pr-4 text-base";
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-gray-500">
        {icon}
      </div>

      {type === "file" ? (
        <>
          <input
            type="file"
            id="attachment-file"
            className="hidden"
            onChange={(e) => onChange?.(e.target.files?.[0] ?? null)}
          />

          <label
            htmlFor="attachment-file"
            className={clsx(
              ATTACHMENT_CLASS,
              "flex cursor-pointer items-center text-gray-600",
            )}>
            {value instanceof File ? value.name : placeholder}
          </label>
        </>
      ) : (
        <BaseInput
          type="url"
          value={(value as string) ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          className={clsx(ATTACHMENT_CLASS, "placeholder:text-gray-600")}
        />
      )}
    </div>
  );
}
