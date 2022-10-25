export const userModulePath = "user";

export const userRoutes = {
  accountPath: "account",
  changePasswordPath: "change-password",
  forgotPasswordPath: "forgot-password",
  resetPasswordPath: "reset-password/:userId/:token",
};

const userLinks = {
  accountLink: () => `/${userModulePath}/account`,
  changePasswordLink: () => `/${userModulePath}/change-password`,
  forgotPasswordLink: () => `/${userModulePath}/forgot-password`,
  resetPasswordLink: ({ userId, token }: { userId: string; token: string }) =>
    `/${userModulePath}/reset-password/${userId}/${token}`,
};

export const {
  accountLink,
  changePasswordLink,
  forgotPasswordLink,
  resetPasswordLink,
} = userLinks;
