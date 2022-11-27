import {
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";

import { endpoints as quizEndpoints } from "../../features/quiz/quizService";
import { getEndpointsMatchers } from "../../utils/getEndpointsMatchers";

import { toggleLoader } from "../reducers/loaderReducer";

const { setAnswer } = quizEndpoints;

const endpointsWithoutLoader = [setAnswer];

const { pendingMatchers, fulfilledMatchers, rejectedMatchers } =
  getEndpointsMatchers(endpointsWithoutLoader as [any, any[]]);

const isWithoutLoader = isAnyOf(
  ...pendingMatchers,
  ...fulfilledMatchers,
  ...rejectedMatchers
);

const loaderMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    const { dispatch } = api;

    if (!isWithoutLoader(action)) {
      if (isPending(action)) {
        dispatch(toggleLoader(true));
      }

      if (isAnyOf(isFulfilled, isRejected)(action)) {
        dispatch(toggleLoader(false));
      }
    }
    return next(action as any);
  };

export default loaderMiddleware;
