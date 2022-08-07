export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  score: number;
  gameCount: number;
};

export type UserSliceState = {
  user: User | null;
};
