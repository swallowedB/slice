import { useMutation } from "@tanstack/react-query";
import { signup } from "../../api/auth";
import { SignupRequest, SignupResponse } from "../../api/types/auth";

export function useSignup() {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signup,
  });
}
