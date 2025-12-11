import { useMutation } from "@tanstack/react-query";
import { signup } from "../../../api/auth";
import { SignupRequest, SignupResponse } from "../../../api/types/auth";

export function useSignupMutation() {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signup,
  });
}
