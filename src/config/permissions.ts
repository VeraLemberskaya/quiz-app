export type RoleType = "user" | "admin";

export type Role = {
  name: RoleType;
  permissions: string[];
};

export const ROLES: { [key in RoleType]: string } = {
  user: "USER",
  admin: "ADMIN",
};

export const PERMISSIONS = {
  updateSettings: "UPDATE_SETTINGS",
};
