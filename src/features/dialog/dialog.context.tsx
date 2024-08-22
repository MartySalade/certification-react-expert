import { createContext, ReactNode, useContext, useState } from "react";

interface IDialogContext {
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const DialogContext = createContext<IDialogContext | undefined>(undefined);

/**
 * This provider help managing the opening and closure of the dialog component.
 * It's usefull to manage this openning and closure from component that didn't instanciate
 * the dialog component itself.
 */
export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <DialogContext.Provider
      value={{
        open,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

/**
 * This hook is used to verify that we can access the context (should always be the case)
 * since the context providers wraps the main <App /> component
 *
 * @returns {IDialogContext}
 */
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider context");
  }
  return context;
};
