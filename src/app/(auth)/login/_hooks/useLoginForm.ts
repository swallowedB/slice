"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useLoginMutation } from "@/hooks/queries/auth";
import { validateLogin } from "@/utils/validation/forms/validateLogin";
import { AuthFieldErrors, LoginFormValues } from "@/types/authForm";

const LOGIN_FORM_INITIAL = {
  email: "",
  password: "",
};

const LOGIN_ERROR_INITIAL: AuthFieldErrors<LoginFormValues> = {};

export function useLoginForm() {
  const router = useRouter();
  const { mutate: login, isPending } = useLoginMutation();

  const [form, setForm] = useState(LOGIN_FORM_INITIAL);
  const [errors, setErrors] = useState(LOGIN_ERROR_INITIAL);
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setServerError("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateLogin(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setServerError("");

    login(
      { email: form.email, password: form.password },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (error) => {
          setServerError(error.message);
        },
      },
    );
  };

  return {
    form,
    errors,
    serverError,
    isPending,
    handleChange,
    handleSubmit,
  };
}
