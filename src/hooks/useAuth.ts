import jwtDecode from "jwt-decode";

import { Role } from "../config/permissions";
import { logout } from "../features/auth/store/authReducer";
import { selectToken, selectUser } from "../features/auth/store/authSelectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type UserData = {
  id: string;
  role: Role;
};

export const useAuth = () => {
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  let role: string = "";
  let permissions: string[] = [];
  let isAuth: boolean = false;

  const dispatch = useAppDispatch();

  if (token) {
    try {
      const { role: roleInfo }: UserData = jwtDecode(token);
      role = roleInfo.name;
      permissions = roleInfo.permissions;
      isAuth = true;
    } catch {
      dispatch(logout());
    }
  }

  return { user, role, permissions, isAuth };
};
