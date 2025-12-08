import { AuthFieldErrors, SignupFormValues } from "../../../types/authForm.type";
import { validateEmail } from "../fields/validateEmail";
import { validateName } from "../fields/validateName";
import { validatePassword } from "../fields/validatePassword";


export function validateSignup(
  values: SignupFormValues
): AuthFieldErrors<SignupFormValues> {
  const errors: AuthFieldErrors<SignupFormValues> = {};

  const nameError = validateName(values.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  if (!values.confirmPassword) {
    errors.confirmPassword = "비밀번호를 한 번 더 입력해주세요.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  }

  return errors;
}
