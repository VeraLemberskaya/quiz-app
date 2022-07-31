export type User = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export type UserSliceState = {
  user: User | null;
};
