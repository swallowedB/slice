const REFRESH_TOKEN_KEY = "refreshToken";

let inMemoryAccessToken: string | null = null;
const isBrowser = typeof window !== "undefined";

/**
 * accessToken → 메모리에만 저장
 * refreshToken → localStorage에 저장
 */
export function setTokens(accessToken: string, refreshToken: string) {
  inMemoryAccessToken = accessToken;

  if (!isBrowser) return;
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

/**
 * accessToken 가져오기
 */
export function getAccessToken(): string | null {
  return inMemoryAccessToken;
}

/**
 * refreshToken 가져오기
 */
export function getRefreshToken(): string | null {
  if (!isBrowser) return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * 로그아웃 시 전체 토큰 제거
 */
export function clearTokens() {
  inMemoryAccessToken = null;
  if (!isBrowser) return;

  localStorage.removeItem(REFRESH_TOKEN_KEY);
}