import { useEffect, useState, type SubmitEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import sendQuestion from "../../api/sendQuestion";
import {
  type QuestionsFormInputs,
  type SendQuestionResult,
  QUESTIONS_FORM_SCHEMA,
  DEFAULT_VALUES,
  RESULT_MESSAGE_TIME,
} from "../../model";

function useSendQuestion() {
  "use no memo";

  const [result, setResult] = useState<SendQuestionResult>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuestionsFormInputs>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(QUESTIONS_FORM_SCHEMA),
  });

  const submit: SubmitHandler<QuestionsFormInputs> = async (data) => {
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

  return {
    register,
    errors,
    isSubmitting,
    result,
    onSubmit: (e: SubmitEvent<HTMLFormElement>) => void handleSubmit(submit)(e),
  };
}

export default useSendQuestion;
