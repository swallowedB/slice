export function validateName(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) return "이름을 입력해주세요.";

  if (trimmed.length < 2) {
    return "이름은 최소 2자 이상이어야 합니다.";
  }

  if (trimmed.length > 10) {
    return "이름은 10자를 초과할 수 없습니다.";
  }
  return "";
}
