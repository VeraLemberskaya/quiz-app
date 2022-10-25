import { AuthState } from "../features/auth/types";

const loadState = (key: string) => {
  const serializedState = localStorage.getItem(key);

  if (serializedState !== null) {
    return JSON.parse(serializedState);
  }
  return null;
};

export const saveState = (key: string, state: any) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem(key, serializedState);
};

export const loadAuth = () => {
  return loadState("auth");
};

export const saveAuth = (state: AuthState) => {
  saveState("auth", state);
};
