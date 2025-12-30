import { backendFetch } from "@/lib/backend";
import { setAuthCookies } from "@/lib/cookies";
import { NextResponse } from "next/server";

type LoginRequest = { email: string; password: string };
type LoginResponse = { accessToken: string; refreshToken: string };

export async function POST(req: Request) {
  const body = (await req.json()) as LoginRequest;

  const data = await backendFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
    auth: "none",
  });

  await setAuthCookies({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });

  return NextResponse.json({ ok: true });
}
