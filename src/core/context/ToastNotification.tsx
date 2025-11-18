import clsx from "clsx";
import styles from "./ToastNotification.module.scss";
import type { Toast } from "./toast";

interface ToastProps {
  toasts: Toast[];
}

const ToastNotification: React.FC<ToastProps> = ({ toasts }) => (
  // biome-ignore lint/a11y/useSemanticElements: role=status is correct for toasts
  <div
    className={styles.toast}
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    {toasts.map((toast) => (
      <div key={toast.id} className={clsx(styles.toast__message, "text--sm")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>

        <span>{toast.message}</span>
      </div>
    ))}
  </div>
);

export default ToastNotification;
