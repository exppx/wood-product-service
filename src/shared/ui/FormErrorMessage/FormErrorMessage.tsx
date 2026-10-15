import s from "./FormErrorMessage.module.scss";

interface FormErrorMessageProps {
  id?: string;
  message: string;
}

function FormErrorMessage({ id, message }: FormErrorMessageProps) {
  return (
    <div id={id} className={s["form-error-message"]} role="alert">
      <div className={s["form-error-message__text"]}>{message}</div>
    </div>
  );
}

export default FormErrorMessage;
