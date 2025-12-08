import { useMutation } from "@tanstack/react-query";
import { signupAPI} from "../../api/auth.api";
import { SignupRequest, SignupResponse } from "../../api/types/auth.types";

export function useSignupMutation() {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signupAPI,
  });
}
