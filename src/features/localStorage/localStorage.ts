import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
        window.dispatchEvent(new Event("local-storage"));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent | CustomEvent) => {
      if (event instanceof StorageEvent && event.key !== key) return;
      try {
        const newValue = localStorage.getItem(key);
        setStoredValue(newValue ? JSON.parse(newValue) : initialValue);
      } catch (error) {
        console.warn(
          `Error parsing localStorage value for key "${key}":`,
          error
        );
        setStoredValue(initialValue);
      }
    };

    window.addEventListener(
      "local-storage",
      handleStorageChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "local-storage",
        handleStorageChange as EventListener
      );
    };
  }, [key, initialValue]);

  return [storedValue, setValue] as const;
}
