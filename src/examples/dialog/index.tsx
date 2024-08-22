import { useState } from "react";
import { Dialog } from "../../features/dialog";
import { useDialog } from "../../features/dialog/dialog.context";
import { CloseButtonOutsideOfDialogInstanciation } from "./closeButtonOutsideOfDialogInstanciation";

/**
 * A dialog example usage with 3 use cases:
 * - The "Open dialog" button open a dialog where the user can interract with the rest of the page even if the dialog is open
 * - The "Open modal" button open a dialog where the user cannot interract with the rest of the page while the dialog remains open
 * - The "Close dialog outside of dialog instanciation" button show that you can close the dialog in a component that differs from the one instanciating the dialog
 */
export function DialogExample() {
  const [isModal, setIsModal] = useState(false);

  const { openDialog, closeDialog } = useDialog();

  return (
    <div className="bg-slate-100 p-4 rounded flex flex-col gap-8">
      <h2 className="font-semibold text-xl">Dialog exercice</h2>
      <div className="flex gap-4">
        <button
          onClick={() => {
            setIsModal(false);
            openDialog();
          }}
          className="rounded bg-blue-400 p-2 px-4 text-white font-semibold"
        >
          Open dialog
        </button>
        <button
          onClick={() => {
            setIsModal(true);
            openDialog();
          }}
          className="rounded bg-blue-400 p-2 px-4 text-white font-semibold"
        >
          Open modal
        </button>
        <CloseButtonOutsideOfDialogInstanciation />
      </div>

      <Dialog
        header={"Hello!"}
        body={"I'm a sample dialog component."}
        footer={
          <div className="flex gap-4">
            <button
              onClick={closeDialog}
              className="p-1 px-4 bg-red-100 border border-red-500 rounded"
            >
              Cancel
            </button>
            <button
              onClick={closeDialog}
              className="p-1 px-4 bg-green-100 border border-green-500 rounded"
            >
              Confirm
            </button>
          </div>
        }
        isModal={isModal}
      />
    </div>
  );
}
