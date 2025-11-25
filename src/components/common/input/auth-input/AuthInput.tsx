"use client";

import BaseInput from "../base-input/BaseInput";
import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


const INPUTMESSAGE = {
  email: {
    placeholder: "이메일을 입력해주세요",
  },
  password: {
    placeholder: "비밀번호를 입력해주세요",
  },
} as const;

export type InputStatus = "default" | "filled" | "error";

export interface InputProps {
  type?: "email" | "password";
  value: string;
  status?: InputStatus;
  placeholder?: string;
  isPasswordVisible?: boolean;
  icon?: React.ReactNode;

  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickTogglePassword?: () => void;
}


export default function AuthInput({
  type = "email",
  value,
  status = "default",
  placeholder,
  isPasswordVisible = false,
  onChangeInput,
  onClickTogglePassword,
}: InputProps) {

  const isPasswordField = type === "password";

  let inputType: "text" | "password" = "text";
  if(type === "password"){
    inputType = isPasswordVisible ? "text" : "password";
  }

  const resolvedPlaceholder = placeholder ?? INPUTMESSAGE[type].placeholder;

  const inputClassName = clsx(
    "border px-4 rounded-xl h-[52px] flex items-center",
    {
      "border-gray-300 bg-white": status === "default",
      "bg-orange-50 border-orange-300": status === "filled",
      "border-red-400 bg-white": status === "error",
    }
  )

  const rightIcon = isPasswordField && (
    <button type="button" onClick={onClickTogglePassword}>
      {isPasswordVisible ? (
        <EyeIcon className="w-5 h-5 text-gray-500" />
      ) : (
        <EyeSlashIcon className="w-5 h-5 text-gray-500" />
      )}
    </button>
  )

  return (
    <div className="flex flex-col gap-1 w-full">
      <BaseInput
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