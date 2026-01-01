import { publicFetcher } from "@/lib/publicFetcher";
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "./types/auth";

export function signup(body: SignupRequest) {
  return publicFetcher<SignupResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function login(body: LoginRequest): Promise<{ ok: true }> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("🚨 로그인 실패");
  return res.json();
}

export async function logout(): Promise<{ ok: true }> {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("🚨 로그아웃 실패");
  return res.json();
}

export async function me(): Promise<LoginResponse["user"]> {
  const res = await fetch("/api/auth/me", { credentials: "include" });
  if (!res.ok) throw new Error("🚨 Unauthenticated");
  return res.json();
}
