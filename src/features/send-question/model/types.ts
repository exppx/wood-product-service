import * as yup from "yup";
import type { QUESTIONS_FORM_SCHEMA } from "./validation";

type QuestionsFormInputs = yup.InferType<typeof QUESTIONS_FORM_SCHEMA>;

type SendQuestionResult = null | "success" | "fail";

export type { QuestionsFormInputs, SendQuestionResult };
