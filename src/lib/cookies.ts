import { cookies } from "next/headers";

const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";

function baseCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true as const,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/" as const,
  };
}

export async function setAuthCookies(params: {
  accessToken: string;
  refreshToken: string;
  accessMaxAgeSeconds?: number;
  refreshMaxAgeSeconds?: number;
}) {
  const store = await cookies(); 
  const opt = baseCookieOptions();

  store.set(ACCESS_COOKIE, params.accessToken, {
    ...opt,
    maxAge: params.accessMaxAgeSeconds ?? 60 * 15,
  });

  store.set(REFRESH_COOKIE, params.refreshToken, {
    ...opt,
    maxAge: params.refreshMaxAgeSeconds ?? 60 * 60 * 24 * 14,
  });
}

export async function clearAuthCookies() {
  const store = await cookies();
  const opt = baseCookieOptions();

  store.set(ACCESS_COOKIE, "", { ...opt, maxAge: 0 });
  store.set(REFRESH_COOKIE, "", { ...opt, maxAge: 0 });
}

export async function getAccessTokenFromCookies(): Promise<string | null> {
  const store = await cookies(); 
  return store.get(ACCESS_COOKIE)?.value ?? null;
}

export async function getRefreshTokenFromCookies(): Promise<string | null> {
  const store = await cookies(); 
  return store.get(REFRESH_COOKIE)?.value ?? null;
}
