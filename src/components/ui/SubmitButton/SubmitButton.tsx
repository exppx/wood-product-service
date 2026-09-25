import Button from "@/components/ui/Button/Button";
import type { ComponentProps, PropsWithChildren } from "react";
import Spinner from "@/components/ui/Spinner/Spinner";

import styles from "./SubmitButton.module.scss";

interface SubmitButtonProps
  extends PropsWithChildren, ComponentProps<"button"> {
  isSubmitting: boolean;
}

function SubmitButton({
  isSubmitting,
  children,
  className,
  ...rest
}: SubmitButtonProps) {
  return (
    <Button
      {...rest}
      className={className}
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <div className={styles["submit-button__spinner-container"]}>
          <Spinner />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}

export default SubmitButton;
