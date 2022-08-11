import axios from ".";
import { Game, Question } from "../redux/quiz/types";
import { Settings } from "../redux/settings/types";
import { User } from "../redux/user/types";
import {
  quizEndPoint,
  settingsEndPoint,
  statisticsEndPoint,
  usersEndPoint,
} from "./constants";

export const getUsers = async (params?: { page: number; orderBy: string }) => {
  return await axios
    .get<{ data: User[]; pageCount: number }>(usersEndPoint, {
      params,
    })
    .then((response) => response.data);
};

export const getUserPage = async (user: User, params?: { orderBy: string }) => {
  return await axios
    .get<{ page: number }>(`${usersEndPoint}/page/${user.id}`, {
      params,
    })
    .then((response) => response.data);
};

export const getSavedUser = async () => {
  return await axios
    .get<User>(`${usersEndPoint}/get-saved-user`)
    .then((response) => response.data);
};

export const authenticateUser = async (credentials: {
  email: string;
  password: string;
}) => {
  return await axios
    .post<User>(`${usersEndPoint}/login`, credentials)
    .then((response) => response.data);
};

export const registerUser = async (data: {
  name: string;
  surname: string;
  email: string;
  password?: string;
}) => {
  return await axios
    .post(usersEndPoint, data)
    .then((response) => response.data);
};

export const updateUser = async (
  user: User,
  data: {
    name: string;
    surname: string;
    email: string;
  }
) => {
  return await axios
    .put<User>(`${usersEndPoint}/${user.id}`, data)
    .then((response) => response.data);
};

export const saveUser = async (user: User) => {
  return await axios
    .post(`${usersEndPoint}/save-user`, { id: user.id })
    .then((response) => response.data);
};

export const saveUserGame = async (user: User, game: Omit<Game, "id">) => {
  return await axios.post(`${usersEndPoint}/set-game-result`, {
    id: user.id,
    game,
  });
};

export const getUserGames = async (user: User, params: { page: number }) => {
  return await axios
    .get<{ data: Game[]; pageCount: number }>(
      `${usersEndPoint}/${user.id}/games`,
      { params }
    )
    .then((response) => response.data);
};

export const checkUserPassword = async (user: User, password: string) => {
  return await axios
    .post(`${usersEndPoint}/check-password`, { id: user.id, password })
    .then((response) => response.data);
};

export const updateUserPassword = async (user: User, password: string) => {
  return await axios
    .post(`${usersEndPoint}/change-password`, {
      id: user.id,
      password,
    })
    .then((response) => response.data);
};

export const getSettings = async () => {
  return await axios
    .get<Settings>(settingsEndPoint)
    .then((response) => response.data);
};

export const updateSettings = async (settings: Settings) => {
  return await axios
    .put(settingsEndPoint, settings)
    .then((response) => response.data);
};

export const getStatistics = async () => {
  return await axios.get(statisticsEndPoint).then((response) => response.data);
};

export const getQuiz = async () => {
  return await axios
    .get<Question[]>(quizEndPoint)
    .then((response) => response.data);
};
