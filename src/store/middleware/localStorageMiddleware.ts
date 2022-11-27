import { isAnyOf, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { throttle } from "lodash";

import { actions } from "../../features/auth/store/authReducer";
import { saveAuth } from "../../services/localStorageService";

const throttledSaveAuth = throttle((state) => saveAuth(state), 1000);

const authActions = Object.values(actions);
const [first, ...rest] = authActions;

const isAuthAction = isAnyOf(first, ...rest);

const localStorageMiddleware: Middleware =
  ({ getState }: MiddlewareAPI) =>
  (next) =>
  (action) => {
    if (isAuthAction(action)) {
      const result = next(action as any);
      throttledSaveAuth(getState().auth);
      return result;
    }
    return next(action);
  };

export default localStorageMiddleware;
