import type { ToastType } from "@types";

export default function Toast({ open, type, message }: ToastType): JSX.Element {
  if (type === null || message === null) {
    if (import.meta.env.DEV) console.error("Missing type or message");
    return (
      <div className="fixed top-10 right-10 min-w-60 bg-[#333] p-4 text-white rounded-md shadow-md transition-transform ease-in-out duration-500 invisible" />
    );
  }

  const mapType = {
    success: "bg-[#4caf50]",
    error: "bg-[#f44336]",
    warning: "bg-[#ff9800]",
    info: "bg-[#2196f3]",
  };

  return (
    <div
      className={`fixed top-10 right-10 min-w-60 bg-[#333] p-4 text-white rounded-md shadow-md visible transition-transform ease-in-out duration-500 ${mapType[type]} ${open ? "visible -translate-y-5" : "invisible"}`}
    >
      {message}
    </div>
  );
}
