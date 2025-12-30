import { NextResponse } from "next/server";
import { getAccessTokenFromCookies } from "@/lib/cookies";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE) throw new Error("🚨 NEXT_PUBLIC_BASE_URL을 찾을 수 없습니다");

type Ctx = { params: Promise<{ path: string[] }> };

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
  //   return new NextResponse(res.body, {
  //     status: res.status,
  //     headers: new Headers(res.headers),
  //   });
  const headers = new Headers(res.headers);

  // 🔧 압축 관련 헤더 제거
  headers.delete("content-encoding");
  headers.delete("content-length");
  headers.delete("transfer-encoding");

  return new NextResponse(res.body, {
    status: res.status,
    headers,
  });
}

async function handler(req: Request, ctx: Ctx) {
  const { path } = await ctx.params;
  const backendUrl = buildBackendUrl(req, path);

  const method = req.method.toUpperCase();
  const hasBody = !["GET", "HEAD"].includes(method);
  const bodyBuf = hasBody ? await req.arrayBuffer() : undefined;

  const access1 = await getAccessTokenFromCookies();
  let res = await callBackend(req, backendUrl, access1, bodyBuf);

  if (res.status !== 401) return passThrough(res);

  const origin = new URL(req.url).origin;
  const refreshRes = await fetch(`${origin}/api/auth/refresh`, {
    method: "POST",
    cache: "no-store",
  });

  if (!refreshRes.ok) {
    return NextResponse.json(
      { ok: false, message: "Unauthenticated" },
      { status: 401 },
    );
  }

  const access2 = await getAccessTokenFromCookies();
  res = await callBackend(req, backendUrl, access2, bodyBuf);

  return passThrough(res);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
