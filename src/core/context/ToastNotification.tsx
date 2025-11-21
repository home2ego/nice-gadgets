import clsx from "clsx";
import Icon from "@/layout/shared/components/Icon";
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
        <Icon stroke="currentColor" width="24" height="24">
          <path d="M20 6 9 17l-5-5" />
        </Icon>

        <span>{toast.message}</span>
      </div>
    ))}
  </div>
);

export default ToastNotification;
