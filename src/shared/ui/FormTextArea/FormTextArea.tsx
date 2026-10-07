import { useId, type ComponentProps } from "react";
import { TextArea, FormErrorMessage } from "@/shared/ui";

import styles from "./FormTextArea.module.scss";

interface FormTextAreaProps extends ComponentProps<"textarea"> {
  label: string;
  name: string;
  error?: null | string;
}

function FormTextArea({
  label,
  name,
  error,
  className,
  ...rest
}: FormTextAreaProps) {
  const id = useId();
  const textareaId = `${id}-textarea`;
  const errorId = `${id}-error`;

  return (
    <div className={styles["form-textarea"]}>
      <label htmlFor={textareaId} className={styles["form-textarea__label"]}>
        {label}
      </label>

      <TextArea
        {...rest}
        id={textareaId}
        name={name}
        isError={!!error}
        aria-describedby={error ? errorId : undefined}
        className={className}
      />

      {error && <FormErrorMessage message={error} id={errorId} />}
    </div>
  );
}

export default FormTextArea;
