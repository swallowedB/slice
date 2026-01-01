"use client";
import { useLoginMutation, useSignupMutation } from "@/hooks/queries/auth";
import { AuthFieldErrors, SignupFormValues } from "@/types/authForm";
import { validateSignup } from "@/utils/validation/forms/validateSignup";
import { useRouter } from "next/navigation";
import { useState } from "react";

const INITIAL_FORM: SignupFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const INITIAL_ERRORS: AuthFieldErrors<SignupFormValues> = {};

export function useSignupForm() {
  const router = useRouter();
  const [form, setForm] = useState<SignupFormValues>(INITIAL_FORM);
  const [errors, setErrors] =
    useState<AuthFieldErrors<SignupFormValues>>(INITIAL_ERRORS);

  const { mutate, isPending } = useSignupMutation();
  const { mutate: loginMutate, isPending: isLoginPending } = useLoginMutation();

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

    mutate(
      {
        name: form.name,
        email: form.email,
        password: form.password,
      },
      {
        onSuccess: () => {
          loginMutate(
            {
              email: form.email,
              password: form.password,
            },
            {
              onSuccess: () => {
                router.replace("/dashboard");
              },
            },
          );
        },
        onError: (error) => {
          alert(error.message);
        },
      },
    );
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    isPending,
  };
}
