export function validatePassword(value: string): string {
  if (!value) return "비밀번호를 입력해주세요.";

  if (value.length < 8) {
    return "비밀번호는 8자 이상이어야 합니다.";
  }

  if (!/[0-9]/.test(value)) {
    return "비밀번호에 숫자가 포함되어야 합니다.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return "비밀번호에 특수문자가 포함되어야 합니다.";
  }

  if (/\s/.test(value)) {
    return "비밀번호에는 공백이 포함될 수 없습니다.";
  }

  return "";
}