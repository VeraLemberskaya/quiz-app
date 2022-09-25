export const getExpiryTimestamp = (expiryTime: number) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + expiryTime);
  return time;
};
