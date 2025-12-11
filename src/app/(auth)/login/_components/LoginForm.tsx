"use client";
import FormField from "@/app/(auth)/_components/FormField";
import Button from "@/components/common/button/Button";
import { useLoginForm } from "../_hooks/useLoginForm";

export default function LoginForm() {
  const { form, errors, serverError, isPending, handleChange, handleSubmit } =
    useLoginForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4">
      <FormField
        hideLabel={true}
        label="이메일"
        name="email"
        type="email"
        error={errors.email}
        value={form.email}
        onChange={handleChange}
      />
      <FormField
        hideLabel={true}
        label="비밀번호"
        name="password"
        type="password"
        error={errors.password}
        value={form.password}
        onChange={handleChange}
      />
      {serverError && (
        <p className="mt-1 text-sm text-red-500">{serverError}</p>
      )}
      <div className="mt-8">
        <Button type="submit">
          {isPending ? "로그인 중..." : "로그인 하기"}
        </Button>
      </div>
    </form>
  );
}
