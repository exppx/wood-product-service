import * as yup from "yup";

const MIN_QUESTION_LENGTH = 15;
const MAX_QUESTION_LENGTH = 1000;

const QUESTIONS_FORM_SCHEMA = yup.object({
  name: yup.string().trim().required("required"),

  tel: yup
    .string()
    .trim()
    .required("required")
    .matches(/^\+\d{10,15}$/, "invalid"),

  question: yup
    .string()
    .trim()
    .required("required")
    .min(MIN_QUESTION_LENGTH, "short")
    .max(MAX_QUESTION_LENGTH, "long"),
});

export { MIN_QUESTION_LENGTH, MAX_QUESTION_LENGTH, QUESTIONS_FORM_SCHEMA };
