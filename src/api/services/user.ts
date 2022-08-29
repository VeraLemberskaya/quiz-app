import { User } from "../../features/user/services/types";
import { usersEndPoint } from "../constants";
import axios from "../index";

export const saveUser = (user: User) => {
  return axios
    .post(`${usersEndPoint}/save-user`, { id: user.id })
    .then((response) => response.data);
};
