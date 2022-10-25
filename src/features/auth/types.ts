import { User } from "../../types/types";

export type AuthState = {
  user: User | null;
  token: string | null;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
};

export type RefreshResponse = {
  accessToken: string;
};

export type RegisterRequest = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ActivateRequest = {
  userId?: string;
  token?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
  persist: boolean;
};
