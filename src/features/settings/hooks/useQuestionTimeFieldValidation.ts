export const useQuestionTimeFieldValidation = () => ({
  required: "Field is required",
  min: {
    value: 5,
    message: "Question time should be greater than or equal to 5.",
  },
  max: {
    value: 60,
    message: "Question time should be less than or equal to 60.",
  },
});
