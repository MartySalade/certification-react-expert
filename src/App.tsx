import "./App.css";
import { AutoFilterExample } from "./examples/autoFilter";
import { DialogExample } from "./examples/dialog";
import { LocalStorageExample } from "./examples/localStorage";

function App() {
  return (
    <div className="max-w-7xl flex flex-col gap-8 p-16 mx-auto">
      <LocalStorageExample />
      <DialogExample />
      <AutoFilterExample />
    </div>
  );
}

export default App;
