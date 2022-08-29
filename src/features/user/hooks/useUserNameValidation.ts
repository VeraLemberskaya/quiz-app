export const useUserNameValidation = () => ({
  required: "Field is required.",
  pattern: {
    value: /^[A-Za-z]+$/,
    message: "Incorrect input.",
  },
});
