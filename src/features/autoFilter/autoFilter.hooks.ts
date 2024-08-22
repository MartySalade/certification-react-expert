import { Dispatch, RefObject, useEffect } from "react";

export function useOpenResults(
  inputRef: RefObject<HTMLInputElement>,
  setOpenResults: Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    const handleFocus = () => setOpenResults(true);
    const handleBlur = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        // Delay the close action to allow click events to be processed
        setTimeout(() => setOpenResults(false), 100);
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
      document.addEventListener("mousedown", handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("focus", handleFocus);
      }
      document.removeEventListener("mousedown", handleBlur);
    };
  }, [inputRef, setOpenResults]);
}
