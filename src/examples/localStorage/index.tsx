import { LocalStorageSetter } from "./localStorageSetter";
import { LocalStorageUpdater } from "./localStorageUpdater";

export const KEY = "myKey";

export function LocalStorageExample() {
  return (
    <div className="flex flex-col gap-4 bg-slate-100 p-4 rounded">
      <h2 className="font-semibold text-xl">Local storage exercice</h2>
      <div className="flex gap-8">
        <LocalStorageSetter />
        <LocalStorageUpdater />
      </div>
    </div>
  );
}
