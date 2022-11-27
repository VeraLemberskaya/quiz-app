import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const errorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const { status, data } = action.payload;
      if (status !== 401) {
        toast.error(`${data.message}`);
      }
    }

    return next(action);
  };

export default errorMiddleware;
