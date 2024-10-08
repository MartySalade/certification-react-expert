import { useState, useEffect, useCallback } from "react";

/**
 * This hooks works like a setState from react but will store and get the value in the local storage
 *
 * @param key the key to update in local storage
 * @param initialValue initial value for key
 */
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

    // "storage" event is used to rerender component when the key is updated manually in the local storage
    // "local-storage" is a custom event triggered when the user click on the "SET VALUE" button to update the local storage value for key

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(
      "local-storage",
      handleStorageChange as EventListener
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "local-storage",
        handleStorageChange as EventListener
      );
    };
  }, [key, initialValue]);

  // as const used to avoid typescript errors
  return [storedValue, setValue] as const;
}
