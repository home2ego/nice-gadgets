import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "@/layout/shared/components/Icon";
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
      <Icon stroke="currentColor" width="24" height="24">
        <path d="M20 6 9 17l-5-5" />
      </Icon>

      <span>{toast.message}</span>

      <button
        type="button"
        className={styles.cross}
        aria-label={t("dismissNotificationLabel")}
        onClick={() => setIsClosing(true)}
      >
        <Icon stroke="currentColor">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </Icon>
      </button>
    </div>
  );
};

export default ToastItem;
