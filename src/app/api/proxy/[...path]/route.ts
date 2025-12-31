import { backendFetch } from "@/lib/backend";
import {
  clearAuthCookies,
  getAccessTokenFromCookies,
  getRefreshTokenFromCookies,
  setAuthCookies,
} from "@/lib/cookies";
import { NextResponse } from "next/server";


const BASE = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE) throw new Error("🚨 NEXT_PUBLIC_BASE_URL을 찾을 수 없습니다");

type Ctx = { params: Promise<{ path: string[] }> };
type RefreshResponse = { accessToken: string; refreshToken: string };

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

function buildBackendUrl(req: Request, pathArr: string[]) {
  const base = BASE!.endsWith("/") ? BASE!.slice(0, -1) : BASE!;
  const path = pathArr.length ? `/${pathArr.join("/")}` : "";
  const search = new URL(req.url).search;
  return `${base}${path}${search}`;
}

function buildForwardHeaders(req: Request, accessToken: string | null) {
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");

  headers.delete("authorization");
  if (accessToken) headers.set("authorization", `Bearer ${accessToken}`);

  return headers;
}

async function callBackend(
  req: Request,
  url: string,
  accessToken: string | null,
  bodyBuf?: ArrayBuffer,
) {
  const method = req.method.toUpperCase();
  const hasBody = !["GET", "HEAD"].includes(method);

  const headers = buildForwardHeaders(req, accessToken);

  return fetch(url, {
    method,
    headers,
    body: hasBody ? bodyBuf : undefined,
    cache: "no-store",
  });
}

function passThrough(res: Response) {
  const headers = new Headers(res.headers);

  headers.delete("content-encoding");
  headers.delete("content-length");
  headers.delete("transfer-encoding");

  return new NextResponse(res.body, {
    status: res.status,
    headers,
  });
}

function attachClearAuthCookies(res: NextResponse) {
  const opt = baseCookieOptions();
  res.cookies.set(ACCESS_COOKIE, "", { ...opt, maxAge: 0 });
  res.cookies.set(REFRESH_COOKIE, "", { ...opt, maxAge: 0 });
  return res;
}

async function handler(req: Request, ctx: Ctx) {
  
  const { path } = await ctx.params;
  const backendUrl = buildBackendUrl(req, path);

  const method = req.method.toUpperCase();
  const hasBody = !["GET", "HEAD"].includes(method);
  const bodyBuf = hasBody ? await req.arrayBuffer() : undefined;

  const access1 = await getAccessTokenFromCookies();
  let res = await callBackend(req, backendUrl, access1, bodyBuf);

  if (res.status !== 401 && res.status !== 403) return passThrough(res);

  const refreshToken = await getRefreshTokenFromCookies();
  if (!refreshToken) {
    return attachClearAuthCookies(
      NextResponse.json({ ok: false, message: "Unauthenticated" }, { status: 401 }),
    );
  }

  let refreshed: RefreshResponse;
  try {
    refreshed = await backendFetch<RefreshResponse>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      auth: "none",
    });
  } catch {
    return attachClearAuthCookies(
      NextResponse.json({ ok: false, message: "Unauthenticated" }, { status: 401 }),
    );
  }

  res = await callBackend(req, backendUrl, refreshed.accessToken, bodyBuf);

  const next = passThrough(res);

  const opt = baseCookieOptions();
  next.cookies.set(ACCESS_COOKIE, refreshed.accessToken, {
    ...opt,
    maxAge: 60 * 15,
  });
  next.cookies.set(REFRESH_COOKIE, refreshed.refreshToken, {
    ...opt,
    maxAge: 60 * 60 * 24 * 14,
  });

  return next;
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
