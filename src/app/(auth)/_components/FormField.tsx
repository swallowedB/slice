"use client";
import clsx from "clsx";
import { useState } from "react";
import AuthInput from "../../../components/common/input/auth-input/AuthInput";
import BaseInput from "../../../components/common/input/base-input/BaseInput";

interface FormFieldProps {
  label: string;
  hideLabel?: boolean;
  name: string;
  type?: "email" | "password" | "text";
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function FormField({
  label,
  name,
  type,
  value,
  placeholder,
  error,
  hideLabel = false,
  onChange,
}: FormFieldProps) {
  const errorId = `${name}-Error`;
  const hasError = Boolean(error);
  const isFilled = !hasError && value.length > 0;

  const inputClassName = clsx(
    "border px-4 rounded-xl h-[52px] flex items-center bg-white",
    {
      "border-gray-100": !isFilled && !hasError,
      "border-gray-200": isFilled,
      "border-red-500": hasError,
    },
  );

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex flex-col">
      {!hideLabel && (
        <label
          htmlFor={name}
          className="mb-2 pl-1 text-sm font-medium text-black">
          {label}
        </label>
      )}

      {type !== "text" ? (
        <AuthInput
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChangeInput={onChange}
          isPasswordVisible={showPassword}
          onClickTogglePassword={togglePassword}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      ) : (
        <BaseInput
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={inputClassName}
        />
      )}

      {error && (
        <p className="mt-2 pl-1 text-xs font-medium text-[#FF3434]">{error}</p>
      )}
    </div>
  );
}
