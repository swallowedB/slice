"use client";
import { useState } from "react";
import FormField from "../../_components/FormField";

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="flex flex-col gap-4 w-full">
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
    </section>
  );
}
