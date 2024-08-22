import { KEY } from "..";
import { useLocalStorage } from "../../../features/localStorage/localStorage";

export function LocalStorageUpdater() {
  const [value] = useLocalStorage<string>(KEY);

  return (
    <div className="flex w-full">
      Value for {KEY}: <b>{value}</b>
    </div>
  );
}
