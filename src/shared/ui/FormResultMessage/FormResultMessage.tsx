import clsx from "clsx";

import s from "./FormResultMessage.module.scss";

interface FormResultMessageProps {
  result: null | "success" | "fail";
  message: string;
}

function FormResultMessage({ result, message }: FormResultMessageProps) {
  function renderContent() {
    if (!result) return null;

    return (
      <div className={s["form-result"]}>
        <div
          className={clsx(s["form-result__text"], {
            [s["form-result__text_success"]]: result === "success",
            [s["form-result__text_fail"]]: result === "fail",
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
