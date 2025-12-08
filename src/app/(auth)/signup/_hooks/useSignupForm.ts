"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signupService } from "../_services/signup.service";
import { AuthFieldErrors, SignupFormValues } from "../../../../types/authForm.type";
import { validateSignup } from "../../../../utils/validation/forms/validateSignup";


const INITIAL_FORM: SignupFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const INITIAL_ERRORS: AuthFieldErrors<SignupFormValues> = {};

export function useSignupForm() {
  const [form, setForm] = useState<SignupFormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<AuthFieldErrors<SignupFormValues>>(INITIAL_ERRORS);

  const signupMutation = useMutation({
    mutationFn: () =>
      signupService({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateSignup(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    signupMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log("회원가입 성공:", data);
        alert("회원가입이 완료되었습니다!");
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    isPending: signupMutation.isPending,
  };
}
