export const hasPermission = (
  userPermissions: string[],
  permissions: string[]
) => {
  return permissions.every((permission) =>
    userPermissions.includes(permission)
  );
};
