import { User, UserAction } from "../redux/user/types";

export const hasPermission = (user: User, action: UserAction) => {
  return user.permissions.includes(action);
};
