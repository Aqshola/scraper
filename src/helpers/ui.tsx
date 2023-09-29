import { useDialogStore } from "@/hooks/useDialog";
import Dialog from "@/components/base/Dialog";
import { useEffect } from "react";

export const useShowDialog = (): {
  showDialog: (title: string, content: React.ReactNode) => void;
} => {
  const store = useDialogStore();
  const DialogComponent = (
    title: string,
    content: React.ReactNode,
    onClose: () => void
  ) => <Dialog content={content} title={title} onClose={onClose} />;

  function showDialog(title: string, content: React.ReactNode) {
    store.setComponent(DialogComponent(title, content, store.hideDialog));
    store.showDialog();
  }

  return { showDialog };
};
