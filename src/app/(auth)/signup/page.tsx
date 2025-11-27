"use client"
import Button from "../../../components/common/button/Button";
import AuthSwitch from "../_components/AuthSwitch";
import SignupForm from "./_components/SignupForm";

export default function SignupPage() {
  const handleClick = () => {
    console.log("퍼블리싱용 함수");
  };

  return (
    <section className="flex w-80 flex-col items-center gap-6 sm:w-100 md:gap-10">
      <SignupForm />
      <Button onClick={handleClick}>회원가입 하기</Button>
      <AuthSwitch
        text="이미 회원이신가요?"
        actionText="로그인"
        href="/login"
      />
    </section>
  );
}
