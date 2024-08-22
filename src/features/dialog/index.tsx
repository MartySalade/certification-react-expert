import { X } from "lucide-react";
import { ReactNode } from "react";
import { useDialog } from "./dialog.context";

type Props = {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
  isModal?: boolean;
};

/**
 * A generic dialog component. Opening and closure is managed by the functions
 * that can be called from the useDialog custom hook
 */
export function Dialog({ header, body, footer, isModal = true }: Props) {
  const { open, closeDialog } = useDialog();

  if (!open) return null;

  return (
    <>
      {isModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center" />
      )}
      <div className="fixed -translate-x-1/2 left-1/2 z-50 overflow-auto flex flex-col gap-8 min-w-96 bg-white rounded shadow-lg w-fit h-fit -translate-y-1/2 top-1/2 mx-auto justify-center">
        <div className="p-4 px-6 border-b border-slate-200 flex justify-between items-center">
          <div className="text-lg font-bold ">{header}</div>
          <button onClick={closeDialog}>
            <X size={20} />
          </button>
        </div>
        <div className="px-6">{body}</div>
        <div className="px-6 pb-4 flex justify-end">{footer}</div>
      </div>
    </>
  );
}
