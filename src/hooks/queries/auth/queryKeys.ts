import { LoginResponse } from "../../../api/types/auth";

export const authQueryKeys = {
  all: ["auth"] as const,
  me: () => [...authQueryKeys.all, "me"] as const
}

export type AuthUser = LoginResponse["user"];

export const AUTH_USER_KEY = "slice_user";
