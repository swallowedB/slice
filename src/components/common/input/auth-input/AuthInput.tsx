"use client";

import BaseInput, {
  InputType as BaseInputType,
} from "@/components/common/input/base-input/BaseInput";
import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export type AuthInputType = "email" | "password";
export type InputStatus = "default" | "filled" | "error";

const INPUTMESSAGE = {
  email: {
    placeholder: "이메일을 입력해주세요",
  },
  password: {
    placeholder: "비밀번호를 입력해주세요",
  },
} as const;

export interface InputProps {
  id?: string;
  name?: string;
  type?: AuthInputType;
  value: string;
  status?: InputStatus;
  placeholder?: string;
  isPasswordVisible?: boolean;
  icon?: React.ReactNode;

  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickTogglePassword?: () => void;
}

export default function AuthInput({
  id,
  name,
  type = "email",
  value,
  status = "default",
  placeholder,
  isPasswordVisible = false,
  onChangeInput,
  onClickTogglePassword,
}: InputProps) {
  const isPasswordField = type === "password";

  let inputType: BaseInputType;
  if (isPasswordField) {
    inputType = isPasswordVisible ? "text" : "password";
  } else {
    inputType = "email";
  }

  const resolvedPlaceholder = placeholder ?? INPUTMESSAGE[type].placeholder;

  const inputClassName = clsx(
    "border px-4 rounded-xl h-[52px] flex items-center",
    {
      "bg-white": true,
      "border-gray-100": status === "default",
      "border-gray-200": status === "filled",
      "border-red-500": status === "error",
    },
  );

  const rightIcon = isPasswordField && (
    <button
      className="cursor-pointer pt-1.5"
      type="button"
      onClick={onClickTogglePassword}>
      {isPasswordVisible ? (
        <EyeIcon
          className="h-5 w-5 text-gray-400"
          strokeWidth={2}
        />
      ) : (
        <EyeSlashIcon
          className="h-5 w-5 text-gray-400"
          strokeWidth={2}
        />
      )}
    </button>
  );

  return (
    <div className="flex w-full flex-col gap-1">
      <BaseInput
        id={id}
        name={name}
        value={value}
        type={inputType}
        onChange={onChangeInput}
        placeholder={resolvedPlaceholder}
        className={inputClassName}
        Icon={rightIcon}
      />
    </div>
  );
}
