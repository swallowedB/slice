import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "./tokenStorage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const REFRESH_PATH = "/auth/tokens";
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

interface ApiErrorResponse {
  message?: string;
  statusCode?: number;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * refreshToken을 사용해서 토큰 재발급
 * POST {BASE_URL}/auth/tokens
 * Authorization: Bearer <refreshToken>
 */
async function refreshTokens() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearTokens();
    throw new Error("🚨 로그인이 필요합니다.");
  }

  const res = await fetch(`${BASE_URL}${REFRESH_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (!res.ok) {
    clearTokens();
    throw new Error("🚨 세션이 만료되었습니다. 다시 로그인해주세요!");
  }

  const data = (await res.json()) as RefreshResponse;
  setTokens(data.accessToken, data.refreshToken);
}


/**
 * 공통 fetcher
 * - 일반 API: accessToken을 Authorization 헤더에 붙여 호출
 * - 401이면 refresh 토큰으로 재발급 → 다시 한 번 재시도
 *   path 예시:
 *   - "/todos", "/auth/login"
 */
export async function fetcher<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const doRequest = async (): Promise<Response> => {
    const accessToken = getAccessToken();

    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(options.headers || {}),
      },
      ...options,
    });
  };

  let res = await doRequest();

  if (res.status !== 401) {
    return handleResponse<T>(res);
  }

  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = refreshTokens().finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });
  }

  if (refreshPromise) {
    await refreshPromise;
  }

  res = await doRequest();
  return handleResponse<T>(res);
}

/**
 * 공통 응답 처리
 * - 2xx: JSON 파싱해서 반환
 * - 204: undefined 반환
 * - 나머지: 에러 메시지 만들어서 throw
 */
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `🚨 요청 실패 (HTTP ${res.status})`;

    try {
      const body = (await res.json()) as ApiErrorResponse;
      if (body.message) message = body.message;
    } catch {
    }

    throw new Error(message);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const data = (await res.json()) as T;
  return data;
}