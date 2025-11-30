import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import check from "@/assets/check.svg";
import x from "@/assets/x.svg";
import styles from "./ToastItem.module.scss";
import type { Toast } from "./toast";

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: number) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [isClosing, setIsClosing] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={clsx(styles.message, "text--sm", isClosing && styles.closing)}
      onTransitionEnd={() => {
        if (isClosing) {
          onRemove(toast.id);
        }
      }}
    >
      <img src={check} alt="" width="24" height="24" decoding="async" />

      <span>{toast.message}</span>

      <button
        type="button"
        className={styles.cross}
        aria-label={t("dismissNotificationLabel")}
        onClick={() => setIsClosing(true)}
      >
        <img src={x} alt="" width="16" height="16" decoding="async" />
      </button>
    </div>
  );
};

export default ToastItem;
