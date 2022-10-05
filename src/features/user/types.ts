export type ForgotPasswordRequest = {
  email: string;
};

export type VerifyRequest = {
  userId?: string;
  token?: string;
};

export type ResetPasswordRequest = {
  userId?: string;
  token?: string;
  password: string;
  confirmPassword: string;
};

export type UpdatePasswordRequest = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};
