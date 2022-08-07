export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
};

export type UserSliceState = {
  user: User | null;
};
