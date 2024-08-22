import { Dispatch, RefObject, useEffect } from "react";

/**
 * This hook trigger event handlers when focusing on the input to open the result or when clicking anywhere else to close it
 *
 * @param inputRef the ref to the input
 * @param setOpenResults the useState setter to manage result list opening
 */
export function useOpenResults(
  inputRef: RefObject<HTMLInputElement>,
  setOpenResults: Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    const handleFocus = () => setOpenResults(true);
    const handleBlur = (event: MouseEvent) => {
      // Here, we verify that the click isn't on the input to close the results
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        // Delay the close action to allow click event on result to be processed
        setTimeout(() => setOpenResults(false), 300);
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
