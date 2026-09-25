import styles from "./FormErrorMessage.module.scss";

interface FormErrorMessageProps {
  id?: string;
  message: string;
}

function FormErrorMessage({ id, message }: FormErrorMessageProps) {
  return (
    <div id={id} className={styles["form-error-message"]} role="alert">
      <div className={styles["form-error-message__text"]}>{message}</div>
    </div>
  );
}

export default FormErrorMessage;
