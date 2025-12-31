import { signup } from "@/api/auth";
import { SignupRequest, SignupResponse } from "@/api/types/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignupMutation() {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signup,
  });
}
