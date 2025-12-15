import { fetcher } from "../lib/fetcher";
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "./types/auth";

export async function signup(body: SignupRequest) {
  return await fetcher<SignupResponse>("/user", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function login(body: LoginRequest) {
  return fetcher<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}