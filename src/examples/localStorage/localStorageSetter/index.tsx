import { useState, FormEvent } from "react";
import { useLocalStorage } from "../../../features/localStorage/localStorage";
import { KEY } from "..";

export function LocalStorageSetter() {
  const [key, setKey] = useState<string>(KEY);
  const [locValue, setLocValue] = useLocalStorage<string | undefined>(key);
  const [value, setValue] = useState<string | undefined>(locValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLocValue(value);
  };

  const isButtonDisabled = !key || !value;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <label
        className="text-xs text-slate-500 flex flex-col gap-1"
        htmlFor="key"
      >
        Key
        <input
          disabled
          id="key"
          placeholder="Enter a key to store it in local storage"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="p-1 rounded text-base"
        />
      </label>
      <label
        className="text-xs text-slate-500 flex flex-col gap-1"
        htmlFor="value"
      >
        Value
        <input
          id="value"
          className="p-1 rounded text-base"
          placeholder="Set the value for the desired key"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <button
        disabled={isButtonDisabled}
        className={`p-2 px-4 bg-blue-400 text-white font-semibold ${
          isButtonDisabled && "cursor-not-allowed bg-slate-400 text-slate-300"
        }`}
      >
        Set value
      </button>
    </form>
  );
}
