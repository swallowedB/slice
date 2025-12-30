import { backendFetch } from "@/lib/backend";
import { NextResponse } from "next/server";

type SignupRequest = { email: string; password: string; name?: string };
type SignupResponse = { id: string; email: string; name: string };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SignupRequest;

    const data = await backendFetch<SignupResponse>("/user", {
      method: "POST",
      body: JSON.stringify(body),
      auth: "none",
    });

    return NextResponse.json(data);
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "🚨 회원가입 실패";

    return NextResponse.json(
      { ok: false, message },
      { status: 400 }
    );
  }
}
