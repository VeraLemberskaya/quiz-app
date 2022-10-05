export const authModulePath = "auth";

export const authRoutes = {
  registerPath: "register",
  loginPath: "login",
  verifyEmailPath: "activate/:userId/:token",
};

const authLinks = {
  registerLink: () => `/${authModulePath}/register`,
  loginLink: () => `/${authModulePath}/login`,
  verifyEmailLink: ({ userId, token }: { userId: string; token: string }) =>
    `${authModulePath}/activate/${userId}/${token}}]`,
};

export const { registerLink, loginLink, verifyEmailLink } = authLinks;
