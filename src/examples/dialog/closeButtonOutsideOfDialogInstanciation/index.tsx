import { useDialog } from "../../../features/dialog/dialog.context";

/**
 * This component is here to show that the dialog can be closed from anywhere
 * by getting the closeDialog function from the Dialog Context and calling it
 */
export function CloseButtonOutsideOfDialogInstanciation() {
  const { closeDialog } = useDialog();

  return (
    <button
      onClick={closeDialog}
      className="border border-blue-400 bg-blue-100 p-2 px-4 rounded w-fit"
    >
      Close dialog outside of dialog instanciation
    </button>
  );
}
