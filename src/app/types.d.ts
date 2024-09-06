export type ToastType = {
  open: boolean;
  type: "success" | "error" | "warning" | "info" | null;
  message: string | null;
};
