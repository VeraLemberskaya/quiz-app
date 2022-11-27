export const getEndpointsMatchers = ([endpoint_0, ...endpoint_1]: [
  any,
  any[]
]) => {
  const endpoints = [endpoint_0, ...endpoint_1];
  const pendingMatchers = endpoints.map(
    (endpoint) => endpoint.matchPending
  ) as [any, ...any[]];
  const fulfilledMatchers = endpoints.map(
    (endpoint) => endpoint.matchFulfilled
  ) as [any, ...any[]];
  const rejectedMatchers = endpoints.map(
    (endpoint) => endpoint.matchRejected
  ) as [any, ...any[]];

  return {
    endpoints,
    pendingMatchers,
    fulfilledMatchers,
    rejectedMatchers,
  };
};
