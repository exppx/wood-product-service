import type { QuestionsFormInputs } from "./types";

const QUESTIONS_FORM_ID = "questions-form";

const RESULT_MESSAGE_TIME = 3000;

const DEFAULT_VALUES: QuestionsFormInputs = {
  name: "",
  tel: "",
  question: "",
};

export { QUESTIONS_FORM_ID, RESULT_MESSAGE_TIME, DEFAULT_VALUES };
