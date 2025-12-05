"use client";
import { useState } from "react";
import FormField from "../../_components/FormField";

export default function SignupForm() {
    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const [errors, setErrors] = useState({
      email: "",
      password: "",
      confirmPassword: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  return (
        <section className="flex flex-col gap-4 w-full">
          <FormField 
            label="이름"
            name="name"
            placeholder="이름을 입력해주세요"
            type="text"
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
        </section>
  )
}
