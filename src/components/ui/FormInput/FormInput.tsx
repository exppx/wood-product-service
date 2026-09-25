import { useId, type ComponentProps } from "react";
import Input from "@/components/ui/Input/Input";
import FormErrorMessage from "@/components/ui/FormErrorMessage/FormErrorMessage";

import styles from "./FormInput.module.scss";

interface FormInputProps extends ComponentProps<"input"> {
  label: string;
  name: string;
  error?: null | string;
}

function FormInput({ label, name, error, className, ...rest }: FormInputProps) {
  const id = useId();
  const inputId = `${id}-input`;
  const errorId = `${id}-error`;

  return (
    <div className={styles["form-input"]}>
      <label htmlFor={inputId} className={styles["form-input__label"]}>
        {label}
      </label>

      <Input
        {...rest}
        id={inputId}
        name={name}
        isError={!!error}
        aria-describedby={error ? errorId : undefined}
        className={className}
      />

      {error && <FormErrorMessage message={error} id={errorId} />}
    </div>
  );
}

export default FormInput;
