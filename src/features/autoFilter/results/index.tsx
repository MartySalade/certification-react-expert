import { IOption } from "../autoFilter.types";
import { getNestedProperty, highlightFilterAsBold } from "../autoFilter.utils";

type Props = {
  value: string;
  results: IOption[];
  valueChange: (selectedItem: IOption) => void;
  optionKeyToFilter: string;
};

/**
 * This component displays the results of the filter search
 * It uses some utils function to find the value of the key (getNestedProperty) and to highlight the input in the result list (highlightFilterAsBold)
 */
export function AutoFilterResults({
  results,
  value,
  valueChange,
  optionKeyToFilter,
}: Props) {
  return (
    <ul className="bg-white rounded shadow mt-2 w-fit flex flex-col gap-0.5 min-w-72">
      {results.length > 0 &&
        results.map((result) => {
          const displayValue = getNestedProperty(result, optionKeyToFilter);
          return (
            <li
              className="hover:bg-slate-200 cursor-pointer px-2 py-0.5"
              key={result.id}
              onClick={() => valueChange(result)}
              onKeyDown={() => valueChange(result)}
            >
              {highlightFilterAsBold(displayValue, value)}
            </li>
          );
        })}
      {value && results.length === 0 && (
        <p className="p-2">There is no result for your search</p>
      )}
    </ul>
  );
}
