import clsx from "clsx";

import styles from "./FormResultMessage.module.scss";

interface FormResultMessageProps {
  result: null | "success" | "fail";
  message: string;
}

function FormResultMessage({ result, message }: FormResultMessageProps) {
  function renderContent() {
    if (!result) return null;

    return (
      <div className={styles["form-result"]}>
        <div
          className={clsx(styles["form-result__text"], {
            [styles["form-result__text_success"]]: result === "success",
            [styles["form-result__text_fail"]]: result === "fail",
          })}
        >
          {message}
        </div>
      </div>
    );
  }

  return (
    <div role="status" aria-live="polite">
      {renderContent()}
    </div>
  );
}

export default FormResultMessage;
