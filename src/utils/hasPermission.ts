import { User, UserAction } from "../features/user/services/types";

export const hasPermission = (user: User, action: UserAction) => {
  return user.permissions.includes(action);
};
