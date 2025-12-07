"use client"
import AuthSwitch from "../_components/AuthSwitch";
import SignupForm from "./_components/SignupForm";

export default function SignupPage() {


  return (
    <section className="flex w-80 flex-col items-center gap-6 sm:w-100 md:gap-10">
      <SignupForm />
      <AuthSwitch
        text="이미 회원이신가요?"
        actionText="로그인"
        href="/login"
      />
    </section>
  );
}
