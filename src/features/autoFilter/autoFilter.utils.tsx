import { IOption } from "./autoFilter.types";

/**
 *
 * @param text the text value displayed in the AutoFilter result list
 * @param highlight the input filter that will be highlighted (set to bold) in the text string
 */
export function highlightFilterAsBold(text: string, highlight: string) {
  // "gi" are options to both match all appearance in highlight and be non case sensitive
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <b key={index}>{part}</b>
    ) : (
      part
    )
  );
}

/**
 * Allow to find deep nested properties in object
 *
 * @param obj the object where the search will be done
 * @param key the key you're looking for in the object
 * @returns the value of the key in the object
 */
export function getNestedProperty(obj: any, keyPath: string) {
  const keys = keyPath.split(".");

  return keys.reduce((currentObject, key) => {
    // "==" instead of "===" to catch both null and undefined
    if (currentObject == null) {
      return undefined;
    }

    return currentObject[key];
  }, obj);
}

/**
 * This function filters a list of options based on the input value of le AutoFilter component and the desired key.
 *
 * @param value input filter value
 * @param options list of options to filter
 * @param optionKeyToFilter the key path to look for to find the value to filter
 * @returns {IOption[]}
 */
export function filterOptionsWithInput(
  value: string,
  options: IOption[],
  optionKeyToFilter: string
) {
  const filteredResults = options.filter((option) => {
    const valueToFilter = getNestedProperty(option, optionKeyToFilter);

    if (!value) return true;

    return typeof valueToFilter === "string"
      ? valueToFilter.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      : false;
  });
  return filteredResults;
}
