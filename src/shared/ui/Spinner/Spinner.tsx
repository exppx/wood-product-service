import s from "./Spinner.module.scss";

function Spinner() {
  return (
    <div className={s["spinner-container"]}>
      <div className={s["spinner"]} data-testid="spinner" />
    </div>
  );
}

export default Spinner;
