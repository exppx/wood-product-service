import { useTranslation } from "react-i18next";
import type { TranslationKey } from "@/shared/types/locales";
import {
  FormInput,
  FormResultMessage,
  FormTextArea,
  SubmitButton,
} from "@/shared/ui";
import {
  QUESTIONS_FORM_ID,
  MAX_QUESTION_LENGTH,
  MIN_QUESTION_LENGTH,
  useSendQuestion,
} from "../../model";

import s from "./QuestionsForm.module.scss";

function QuestionsForm() {
  "use no memo";

  const { t } = useTranslation();
  const { register, result, onSubmit, isSubmitting, errors } =
    useSendQuestion();

  return (
    <form
      id={QUESTIONS_FORM_ID}
      className={s["questions-form"]}
      onSubmit={onSubmit}
    >
      <FormInput
        {...register("name")}
        label={t("QuestionsForm.nameInput.label")}
        placeholder={t("QuestionsForm.nameInput.placeholder")}
        disabled={isSubmitting}
        aria-required="true"
        error={
          errors.name &&
          t(
            `QuestionsForm.nameInput.errors.${errors.name.message}` as TranslationKey,
          )
        }
        type="text"
        autoComplete="name"
      />

      <FormInput
        {...register("tel")}
        label={t("QuestionsForm.telInput.label")}
        placeholder={t("QuestionsForm.telInput.placeholder")}
        disabled={isSubmitting}
        aria-required="true"
        error={
          errors.tel &&
          t(
            `QuestionsForm.telInput.errors.${errors.tel.message}` as TranslationKey,
          )
        }
        type="tel"
        autoComplete="tel"
      />

      <FormTextArea
        {...register("question")}
        className={s["questions-form__textarea"]}
        label={t("QuestionsForm.questionInput.label")}
        placeholder={t("QuestionsForm.questionInput.placeholder")}
        disabled={isSubmitting}
        aria-required="true"
        error={
          errors.question &&
          t(
            `QuestionsForm.questionInput.errors.${errors.question.message}` as TranslationKey,
            {
              length:
                errors.question.message === "short"
                  ? MIN_QUESTION_LENGTH
                  : MAX_QUESTION_LENGTH,
            },
          )
        }
      />

      <SubmitButton isSubmitting={isSubmitting}>
        {t("QuestionsForm.submit")}
      </SubmitButton>

      <FormResultMessage
        result={result}
        message={
          result === "success"
            ? t("QuestionsForm.successMessage")
            : t("QuestionsForm.failMessage")
        }
      />
    </form>
  );
}

export default QuestionsForm;
