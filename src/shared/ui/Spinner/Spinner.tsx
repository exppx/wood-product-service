import styles from "./Spinner.module.scss";

function Spinner() {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles["spinner"]} data-testid="spinner" />
    </div>
  );
}

export default Spinner;
