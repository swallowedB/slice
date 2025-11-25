"use client";

import BaseInput from "../base-input/BaseInput";
import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export type InputStatus = "default" | "filled" | "success" | "error";

export interface InputProps {
  type?: "email" | "password";
  value: string;
  status?: InputStatus;
  placeholder?: string;
  errorMessage?: string;
  isPasswordVisible?: boolean;
  icon?: React.ReactNode;

  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickTogglePassword?: () => void;
}

const INPUTMESSAGE = {
  email: {
    placeholder: "이메일을 입력해주세요",
    errorMessage: "잘못된 이메일입니다.",
  },
  password: {
    placeholder: "비밀번호를 입력해주세요",
    errorMessage: "비밀번호가 일치하지 않습니다.",
  },
} as const;

export default function AuthInput({
  type = "email",
  value,
  status = "default",
  placeholder,
  errorMessage,
  isPasswordVisible = false,
  onChangeInput,
  onClickTogglePassword,
}: InputProps) {
  const isPasswordField = type === "password";

  const inputType = isPasswordField
    ? isPasswordVisible
      ? "text"
      : "password"
    : "text";

  const resolvedPlaceholder = placeholder ?? INPUTMESSAGE[type].placeholder;
  const resolvedErrorMsg = errorMessage ?? INPUTMESSAGE[type].errorMessage;

  return (
    <div className="flex flex-col gap-1 w-full">
      <BaseInput
        value={value}
        type={inputType}
        background="sky"
        onChange={onChangeInput}
        placeholder={resolvedPlaceholder}
        className={clsx(
          "border px-4 rounded-xl h-[52px] flex items-center",
          {
            "border-gray-300 bg-white": status === "default" || status === "filled",
            "bg-orange-50 border-orange-300": status === "success",
            "border-red-400 bg-white": status === "error",
          }
        )}
        Icon={
          isPasswordField && (
            <button type="button" onClick={onClickTogglePassword}>
              {isPasswordVisible ? (
                <EyeIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <EyeSlashIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          )
        }
      />

      {/* 에러 메시지 */}
      {status === "error" && (
        <p className="text-xs text-red-500">{resolvedErrorMsg}</p>
      )}
    </div>
  );
}