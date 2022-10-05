import jwtDecode from "jwt-decode";

import { Role } from "../config/permissions";
import { selectToken, selectUser } from "../features/auth/store/authSelectors";
import { useAppSelector } from "../store/hooks";

type UserData = {
  id: string;
  role: Role;
};

export const useAuth = () => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  let role: string = "";
  let permissions: string[] = [];
  let isAuth: boolean = false;

  if (token) {
    const { role: roleInfo }: UserData = jwtDecode(token);

    role = roleInfo.name;
    permissions = roleInfo.permissions;
    isAuth = true;
  }

  return { user, role, permissions, isAuth };
};
