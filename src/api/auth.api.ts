import { fetcher } from "./fetcher";

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface SignupResponse {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export async function signupAPI(payload: SignupRequest) {
  return await fetcher<SignupResponse>("/user", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}