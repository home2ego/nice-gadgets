import { createContext, useCallback, useState } from "react";
import ToastNotification from "./ToastNotification";
import type { Toast } from "./toast";

interface ToastContextValue {
  showToast: (message: string) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export const ToastProvider: React.FC<ProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastNotification toasts={toasts} />
    </ToastContext.Provider>
  );
};
