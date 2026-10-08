import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  typeChecker: (arg: unknown) => arg is T,
) {
  const [value, setValue] = useState<T>(() => {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
      return defaultValue;
    }

    try {
      const parsedValue = JSON.parse(rawValue) as unknown;

      return typeChecker(parsedValue) ? parsedValue : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}
