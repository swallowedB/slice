
import { signupAPI } from "@/api/auth.api";
import { SignupRequest, SignupResponse } from "../../../../api/types/auth.types";

export async function signupService(form: SignupRequest): Promise<SignupResponse> {
  const result = await signupAPI(form);
  return result;
}
