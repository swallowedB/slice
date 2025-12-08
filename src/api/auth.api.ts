import { fetcher } from "./fetcher";
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from "./types/auth.types";


export async function signupAPI(payload: SignupRequest) {
  return await fetcher<SignupResponse>("/user", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginApi(body: LoginRequest) {
  return fetcher<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}