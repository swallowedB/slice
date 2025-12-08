import { fetcher } from "../lib/fetcher";
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "./types/auth";

export async function signup(payload: SignupRequest) {
  return await fetcher<SignupResponse>("/user", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function login(body: LoginRequest) {
  return fetcher<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
