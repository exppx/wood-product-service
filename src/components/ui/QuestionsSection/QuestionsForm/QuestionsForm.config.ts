import * as yup from "yup";

const QUESTIONS_FORM_ID = "questions-form";
const MIN_QUESTION_LENGTH = 15;
const MAX_QUESTION_LENGTH = 1000;
const RESULT_MESSAGE_TIME = 3000;
const DEFAULT_VALUES: QuestionsFormInputs = {
  name: "",
  tel: "",
  question: "",
};

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

type QuestionsFormInputs = yup.InferType<typeof QUESTIONS_FORM_SCHEMA>;

export {
  QUESTIONS_FORM_ID,
  QUESTIONS_FORM_SCHEMA,
  RESULT_MESSAGE_TIME,
  MIN_QUESTION_LENGTH,
  MAX_QUESTION_LENGTH,
  DEFAULT_VALUES,
  type QuestionsFormInputs,
};
