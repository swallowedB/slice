
import { signupAPI, SignupRequest, SignupResponse } from "@/api/auth.api";

export async function signupService(form: SignupRequest): Promise<SignupResponse> {
  const result = await signupAPI(form);
  return result;
}
