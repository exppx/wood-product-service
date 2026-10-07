import { useId, type ChangeEvent } from "react";
import { useSearchParams } from "react-router";
import Select, { type SelectProps } from "@/shared/ui/Select/Select";

import styles from "./FilterSelect.module.scss";

interface FilterSelectProps extends SelectProps {
  searchKey: string;
  label: string;
}

function FilterSelect({
  label,
  searchKey,
  onChange,
  ...rest
}: FilterSelectProps) {
  const id = useId();
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(searchKey) || "";

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);

    if (value === "") {
      newSearchParams.delete(searchKey);
    } else {
      newSearchParams.set(searchKey, value);
    }

    setSearchParams(newSearchParams);
    onChange?.(event);
  }

  return (
    <div className={styles["filter-select"]}>
      <label className={styles["filter-select__label"]} htmlFor={id}>
        {label}
      </label>
      <Select {...rest} value={value} onChange={handleChange} id={id} />
    </div>
  );
}

export default FilterSelect;
