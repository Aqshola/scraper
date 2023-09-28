export type dialogStore = {
  show: boolean;
  component?: JSX.Element;
  showDialog: () => void;
  hideDialog: () => void;
  setComponent: (component: JSX.Element) => void;
};
