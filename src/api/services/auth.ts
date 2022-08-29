import { User } from "../../features/user/services/types";
import { usersEndPoint } from "../constants";
import axios from "../index";

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
