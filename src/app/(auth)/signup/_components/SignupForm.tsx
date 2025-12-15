"use client";
import Button from "../../../../components/common/button/Button";
import FormField from "../../_components/FormField";
import { useSignupForm } from "../_hooks/useSignupForm";

export default function SignupForm() {
  const { form, errors, handleChange, handleSubmit, isPending } =
    useSignupForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4">
      <FormField
        label="이름"
        name="name"
        placeholder="이름을 입력해주세요"
        type="text"
        error={errors.name}
        value={form.name}
        onChange={handleChange}
      />
      <FormField
        label="이메일"
        name="email"
        type="email"
        error={errors.email}
        value={form.email}
        onChange={handleChange}
      />
      <FormField
        label="비밀번호"
        name="password"
        type="password"
        error={errors.password}
        value={form.password}
        onChange={handleChange}
      />
      <FormField
        label="비밀번호 확인"
        name="confirmPassword"
        type="password"
        placeholder="비밀번호를 한 번 더 입력해주세요"
        error={errors.confirmPassword}
        value={form.confirmPassword}
        onChange={handleChange}
      />
      <div className="mt-8">
        <Button type="submit">
          {isPending ? "회원가입 중..." : "회원가입 하기"}
        </Button>
      </div>
    </form>
  );
}
