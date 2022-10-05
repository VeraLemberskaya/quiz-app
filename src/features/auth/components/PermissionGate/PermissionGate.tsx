import { FC } from "react";

import { useAuth } from "../../../../hooks/useAuth";
import { hasPermission } from "../../../../utils/hasPermission";

type Props = {
  children: React.ReactNode;
  permissions: string[];
};

const PermissionGate: FC<Props> = ({ permissions, children }) => {
  const { permissions: userPermissions } = useAuth();

  const permissionsGranted = hasPermission(userPermissions, permissions);

  if (!permissionsGranted) return null;

  return <>{children}</>;
};

export default PermissionGate;
