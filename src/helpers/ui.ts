import { useDialogStore } from "@/hooks/useDialog";
import Dialog from "@/components/base/Dialog";
import { useEffect } from "react";

type paramUseShowDialog = {
  title?: string;
  content?: React.ReactNode;
};

export const useShowDialog = (): {
  showDialog: (title: string, content: React.ReactNode) => void;
} => {
  const store = useDialogStore();

  function showDialog(title: string, content: React.ReactNode) {
    store.setComponent(
      Dialog({ title: title, content: content, onClose: store.hideDialog })
    );
    store.showDialog();
  }

  return { showDialog };
};
