"use client"
import Button from "../../../components/common/button/Button";
import AuthSwitch from "../_components/AuthSwitch";
import FormField from "../_components/FormField";
import LoginForm from "./_components/LoginForm";

export default function LoginPage() {

  const handleClick = () => {
    console.log('퍼블리싱용 함수')
  }
  return (
    <section className="flex flex-col items-center  w-80 sm:w-100 gap-6 md:gap-10">
      <LoginForm />
      <Button onClick={handleClick}>
        로그인하기
      </Button>
      <AuthSwitch 
        text="슬라이스가 처음이신가요?"
        actionText="회원가입"
        href="/signup"
      />
    </section>
  )
}
