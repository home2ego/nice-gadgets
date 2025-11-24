import ToastItem from "./ToastItem";
import styles from "./ToastNotification.module.scss";
import type { Toast } from "./toast";

interface ToastNotificationProps {
  toasts: Toast[];
  onRemove: (id: number) => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  toasts,
  onRemove,
}) => (
  // biome-ignore lint/a11y/useSemanticElements: role=status is correct for toasts
  <div className={styles.toast} role="status" aria-live="polite">
    {toasts.map((toast) => (
      <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
    ))}
  </div>
);

export default ToastNotification;
