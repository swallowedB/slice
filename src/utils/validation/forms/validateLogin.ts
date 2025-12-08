import { AuthFieldErrors, LoginFormValues } from "../../../types/authForm.type";
import { validateEmail } from "../fields/validateEmail";
import { validatePassword } from "../fields/validatePassword";

export function validateLogin(form: LoginFormValues): AuthFieldErrors<LoginFormValues> {
  const errors: AuthFieldErrors<LoginFormValues> = {};

  const emailError = validateEmail(form.email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(form.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}