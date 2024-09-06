import type { ToastType } from "../types";

export default function Toast({ open, type, message }: ToastType): JSX.Element {
  if (!open)
    return (
      <div
        className={
          "fixed top-10 right-10 min-w-60 bg-[#333] p-4 text-white rounded-md shadow-md invisible"
        }
      />
    );

  if (type === null || message === null) {
    if (import.meta.env.DEV) console.error("Missing type or message");
    return <></>;
  }

  const mapType = {
    success: "bg-[#4caf50]",
    error: "bg-[#f44336]",
    warning: "bg-[#ff9800]",
    info: "bg-[#2196f3]",
  };

  return (
    <div
      className={`fixed top-10 right-10 min-w-60 bg-[#333] p-4 text-white rounded-md shadow-md visible -translate-y-5 transition-transform ease-in-out duration-500 ${mapType[type]}`}
    >
      {message}
    </div>
  );
}
