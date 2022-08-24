import axios from ".";
import { Game, Question } from "../redux/quiz/types";
import { Settings } from "../redux/settings/types";
import { User } from "../redux/user/types";
import { quizEndPoint, settingsEndPoint, usersEndPoint } from "./constants";

export const getUserPage = (user: User, params?: { orderBy: string }) => {
  return axios
    .get<{ page: number }>(`${usersEndPoint}/page/${user.id}`, {
      params,
    })
    .then((response) => response.data);
};

export const getSavedUser = () => {
  return axios
    .get<User>(`${usersEndPoint}/get-saved-user`)
    .then((response) => response.data);
};

export const authenticateUser = async (credentials: {
  email: string;
  password: string;
}) => {
  return axios
    .post<User>(`${usersEndPoint}/login`, credentials)
    .then((response) => response.data);
};

export const registerUser = async (data: {
  name: string;
  surname: string;
  email: string;
  password?: string;
}) => {
  return axios.post(usersEndPoint, data).then((response) => response.data);
};

export const updateUser = (
  user: User,
  data: {
    name: string;
    surname: string;
    email: string;
  }
) => {
  return axios
    .put<User>(`${usersEndPoint}/${user.id}`, data)
    .then((response) => response.data);
};

export const saveUser = (user: User) => {
  return axios
    .post(`${usersEndPoint}/save-user`, { id: user.id })
    .then((response) => response.data);
};

export const saveUserGame = (user: User, game: Omit<Game, "id">) => {
  return axios.post(`${usersEndPoint}/set-game-result`, {
    id: user.id,
    game,
  });
};

export const checkUserPassword = (user: User, password: string) => {
  return axios
    .post(`${usersEndPoint}/check-password`, { id: user.id, password })
    .then((response) => response.data);
};

export const updateUserPassword = (user: User, password: string) => {
  return axios
    .post(`${usersEndPoint}/change-password`, {
      id: user.id,
      password,
    })
    .then((response) => response.data);
};

// export const getSettings = () => {
//   return axios
//     .get<Settings>(settingsEndPoint)
//     .then((response) => response.data);
// };

// export const updateSettings = (settings: Settings) => {
//   return axios
//     .put(settingsEndPoint, settings)
//     .then((response) => response.data);
// };

export const getQuiz = (topics: string[]) => {
  return axios
    .get<Question[]>(quizEndPoint, {
      params: {
        topics,
      },
    })
    .then((response) => response.data);
};
