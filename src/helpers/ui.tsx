import { useDialogStore } from "@/hooks/useDialog";
import Dialog from "@/components/base/Dialog";

export const isClient = typeof window !== "undefined";

export const useShowDialog = (): {
  showDialog: (
    title: string,
    content: React.ReactNode,
    onClose?: () => void
  ) => void;
} => {
  const store = useDialogStore();
  const DialogComponent = (
    title: string,
    content: React.ReactNode,
    onClose: () => void
  ) => <Dialog content={content} title={title} onClose={onClose} />;

  function showDialog(
    title: string,
    content: React.ReactNode,
    onClose: () => void = () => {}
  ) {
    store.setComponent(
      DialogComponent(title, content, () => {
        store.hideDialog();
        onClose();
      })
    );
    store.showDialog();
  }

  return { showDialog };
};
