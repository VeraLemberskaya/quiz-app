export const getActionsTypes = (actions: any[]): string[] => {
  return actions.reduce((prev: string[], curr) => [...prev, curr.type], []);
};
