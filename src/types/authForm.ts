export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export type AuthFieldErrors<T> = Partial<Record<keyof T, string>>;
