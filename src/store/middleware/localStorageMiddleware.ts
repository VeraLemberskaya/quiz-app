import { Middleware, Action } from "@reduxjs/toolkit";
import { throttle } from "lodash";

import { actionsTypes as authActions } from "../../features/auth/store/authReducer";
import { saveAuth } from "../../services/localStorageService";

const throttledSaveAuth = throttle((state) => saveAuth(state), 1000);

const localStorageMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action: Action<string>) => {
    if (authActions.includes(action.type)) {
      const result = next(action);
      throttledSaveAuth(getState().auth);
      return result;
    }
    return next(action);
  };

export default localStorageMiddleware;
