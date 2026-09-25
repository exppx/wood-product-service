import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { TranslationKey } from "@/types/locales";
import sendQuestion from "@/api/sendQuestion";
import {
  DEFAULT_VALUES,
  MAX_QUESTION_LENGTH,
  MIN_QUESTION_LENGTH,
  QUESTIONS_FORM_ID,
  QUESTIONS_FORM_SCHEMA,
  RESULT_MESSAGE_TIME,
  type QuestionsFormInputs,
} from "./QuestionsForm.config";
import FormInput from "@/components/ui/FormInput/FormInput";
import FormTextArea from "@/components/ui/FormTextArea/FormTextArea";
import SubmitButton from "@/components/ui/SubmitButton/SubmitButton";
import FromResultMessage from "@/components/ui/FromResultMessage/FromResultMessage";

import styles from "./QuestionsForm.module.scss";

function QuestionsForm() {
  "use no memo";

  const { t } = useTranslation();
  const [result, setResult] = useState<null | "success" | "fail">(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuestionsFormInputs>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(QUESTIONS_FORM_SCHEMA),
  });

  const onSubmit: SubmitHandler<QuestionsFormInputs> = async (data) => {
    try {
      setResult(null);

      await sendQuestion(data);

      setResult("success");
      reset();
    } catch {
      setResult("fail");
    }
  };

  useEffect(() => {
    if (!result) return;

    const timeoutId = setTimeout(() => setResult(null), RESULT_MESSAGE_TIME);

    return () => clearTimeout(timeoutId);
  }, [result]);

  return (
    <form
      id={QUESTIONS_FORM_ID}
      className={styles["questions-form"]}
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
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
        className={styles["questions-form__textarea"]}
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

      <FromResultMessage
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
