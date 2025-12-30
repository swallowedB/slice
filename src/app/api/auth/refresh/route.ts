import { backendFetch, requireRefreshToken } from "@/lib/backend";
import { clearAuthCookies, setAuthCookies } from "@/lib/cookies";
import { NextResponse } from "next/server";

type RefreshResponse = { accessToken: string; refreshToken: string };

export async function POST() {
  try {
    const refreshToken = await requireRefreshToken();

    const data = await backendFetch<RefreshResponse>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      auth: "none",
    });

    await setAuthCookies({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    return NextResponse.json({ ok: true });
  } catch {
    clearAuthCookies();
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
