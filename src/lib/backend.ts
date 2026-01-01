import { getAccessTokenFromCookies, getRefreshTokenFromCookies } from "./cookies";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE) throw new Error("🚨 NEXT_PUBLIC_BASE_URL을 찾을 수 없습니다.");

type BackendFetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
  auth?: "access" | "none";
};

export async function backendFetch<T>(
  path: string,
  options: BackendFetchOptions = {}
): Promise<T> {
  const url = `${BASE}${path.startsWith("/") ? path : `/${path}`}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
  };

  if (options.auth === "access") {
    const token = await getAccessTokenFromCookies();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`🚨 Backend ${res.status} ${res.statusText} ${detail}`);
  }

  return (await res.json()) as T;
}

export async function requireRefreshToken(): Promise<string> {
  const token = await getRefreshTokenFromCookies();

  if (!token) {
    throw new Error("🚨 refresh 토큰을 찾을 수 없습니다.");
  }

  return token;
}