export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  score: number;
  totalGames: number;
};

export type UserSliceState = {
  user: User | null;
};
