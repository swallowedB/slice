export function validateEmail(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) return "이메일을 입력해주세요.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmed)) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  return "";
}