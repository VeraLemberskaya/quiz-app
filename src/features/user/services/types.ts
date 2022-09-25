export type Role = "ADMIN" | "QUEST";
export type UserAction = "CONFIGURE_SETTINGS";

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  score: number;
  role: Role;
  permissions: UserAction[];
  totalGames: number;
};

export type UserSliceState = {
  user: User | null;
};

export type Credentials = {
  email: string;
  password: string;
};
