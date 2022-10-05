import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PERMISSIONS } from "../../config/permissions";
import { useAuth } from "../../hooks/useAuth";
import { hasPermission } from "../../utils/hasPermission";

type Props = {
  permissions?: string[];
};

const PermissionQuard: FC<Props> = ({
  permissions = Object.values(PERMISSIONS),
}) => {
  const { permissions: userPermissions } = useAuth();

  const permissionsGranted = hasPermission(userPermissions, permissions);

  return permissionsGranted ? <Outlet /> : <Navigate to="/" replace />;
};

export default PermissionQuard;
