import clsx from "clsx";
import type { TFunction } from "i18next";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Dialog.module.scss";

interface DialogProps {
  t: TFunction;
  isOpen: boolean;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ t, isOpen, onClose }) => {
  const okRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const app = document.querySelector(".App") as HTMLElement;

    if (isOpen) {
      app.inert = true;
      okRef.current?.focus();
    }

    return () => {
      app.inert = false;
    };
  }, [isOpen]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: onClose is intentionally excluded
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="not-available-title"
      aria-describedby="not-available-desc"
      data-dialog-open={isOpen}
      onPointerDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.dialog}>
        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <h2
          id="not-available-title"
          className={clsx(styles.dialog__heading, "title--lg")}
        >
          {t("notAvailableTitle")}
        </h2>

        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <p
          id="not-available-desc"
          className={clsx(styles.dialog__message, "text--body")}
        >
          {t("notAvailableMessage")}
        </p>

        <button
          type="button"
          className={clsx(styles.dialog__ok, "text--btn")}
          onPointerDown={onClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClose();
            }
          }}
          ref={okRef}
        >
          OK
        </button>
      </div>
    </div>,
    document.getElementById("root") as HTMLElement,
  );
};

export default Dialog;
