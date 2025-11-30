import clsx from "clsx";
import type { TFunction } from "i18next";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Icon from "@/layout/shared/components/Icon";
import styles from "./Dialog.module.scss";

interface DialogProps {
  t: TFunction;
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}

const Dialog: React.FC<DialogProps> = ({ t, isOpen, onClose, onClear }) => {
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
      aria-labelledby="checkout-title"
      aria-describedby="checkout-desc"
      data-dialog-open={isOpen}
      onPointerDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.dialog}>
        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <h2
          id="checkout-title"
          className={clsx(styles.dialog__heading, "title--lg")}
        >
          {t("checkout")}
        </h2>

        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <p
          id="checkout-desc"
          className={clsx(styles.dialog__message, "text--body")}
        >
          {t("checkoutMessage")}
        </p>

        <button
          type="button"
          className={clsx(styles.dialog__confirm, "text--btn")}
          ref={okRef}
          onPointerDown={onClear}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClear();
            }
          }}
        >
          OK
        </button>

        <button
          type="button"
          aria-label={t("cancel")}
          className={clsx(styles.dialog__cancel, "text--btn")}
          onPointerDown={onClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClose();
            }
          }}
        >
          <Icon>
            <path d="M18 6 6 18M6 6l12 12" />
          </Icon>
        </button>
      </div>
    </div>,
    document.getElementById("root") as HTMLElement,
  );
};

export default Dialog;
