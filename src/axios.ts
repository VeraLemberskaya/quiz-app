import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { baseURL } from "./constants";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.data) {
      toast.error(`${error.response?.data}`);
    } else {
      toast.error(`${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
