"use client";
import AuthSwitch from "../_components/AuthSwitch";
import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <section className="flex w-80 flex-col items-center gap-6 sm:w-100 md:gap-10">
      <LoginForm />
      <AuthSwitch
        text="슬라이스가 처음이신가요?"
        actionText="회원가입"
        href="/signup"
      />
    </section>
  );
}
