import clsx from "clsx";

import styles from "./FromResultMessage.module.scss";

interface FromResultMessageProps {
  result: null | "success" | "fail";
  message: string;
}

function FromResultMessage({ result, message }: FromResultMessageProps) {
  function renderContent() {
    if (!result) return null;

    return (
      <div className={styles["form-result"]}>
        <div
          className={clsx([
            styles["form-result__text"],
            {
              [styles["form-result__text_success"]]: result === "success",
              [styles["form-result__text_fail"]]: result === "fail",
            },
          ])}
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

export default FromResultMessage;
