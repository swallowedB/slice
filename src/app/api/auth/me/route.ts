import { backendFetch } from "@/lib/backend";
import { NextResponse } from "next/server";

type MeResponse = { id: string; name: string; email: string };

export async function GET() {
  try {
    const me = await backendFetch<MeResponse>("/user", {
      auth: "access",
    });

    return NextResponse.json(me);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unauthorized";

    return NextResponse.json(
      { authenticated: false, message },
      { status: 401 },
    );
  }
}
