import { ChangeEvent, useRef, useState } from "react";
import { IOption } from "./autoFilter.types";
import { useOpenResults } from "./autoFilter.hooks";
import { filterOptionsWithInput, getNestedProperty } from "./autoFilter.utils";
import { AutoFilterResults } from "./results";

type Props = {
  options: IOption[];
  placeholder: string;
  optionKeyToFilter?: string;
  valueChange: (value: IOption) => void;
};

/**
 * This component is an input that filters a list of options.
 * It takes a optionKeyToFilter props that will be used to know which key to filter in the options.
 * If non provided, we use the "id" key of the option to filter.
 */
export function AutoFilter({
  placeholder,
  optionKeyToFilter = "id",
  options,
  valueChange,
}: Props) {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<IOption[]>(options);
  const [openResults, setOpenResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);

    // If no input, we set back the results with options to display all values
    if (value.length === 0) {
      setResults(options);
      return;
    }

    const filteredResults = filterOptionsWithInput(
      value,
      options,
      optionKeyToFilter
    );
    setResults(filteredResults);
  };

  const handleValueChange = (selectedItem: IOption) => {
    valueChange(selectedItem);
    const newValue = getNestedProperty(selectedItem, optionKeyToFilter);

    const filteredResults = filterOptionsWithInput(
      newValue,
      options,
      optionKeyToFilter
    );
    setResults(filteredResults);
    setValue(newValue);
  };

  // Hook to manage results openning on blur or focus
  useOpenResults(inputRef, setOpenResults);

  return (
    <div>
      <input
        ref={inputRef}
        className="p-1 rounded min-w-72"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
      {openResults && (
        <AutoFilterResults
          value={value}
          results={results}
          valueChange={handleValueChange}
          optionKeyToFilter={optionKeyToFilter}
        />
      )}
    </div>
  );
}
