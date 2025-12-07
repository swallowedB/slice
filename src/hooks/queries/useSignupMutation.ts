import { useMutation } from "@tanstack/react-query";
import { signupAPI, SignupRequest, SignupResponse } from "../../api/auth.api";

export function useSignupMutation() {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signupAPI,
  });
}
