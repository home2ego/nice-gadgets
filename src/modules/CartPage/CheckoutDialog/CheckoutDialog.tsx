import clsx from "clsx";
import type { TFunction } from "i18next";
import { useRef } from "react";
import { createPortal } from "react-dom";
import Icon from "@/layout/shared/components/Icon";
import { useModalEffects } from "@/layout/shared/hooks/useModalEffects";
import styles from "./CheckoutDialog.module.scss";

interface DialogProps {
  t: TFunction;
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}

const CheckoutDialog: React.FC<DialogProps> = ({
  t,
  isOpen,
  onClose,
  onClear,
}) => {
  const okRef = useRef<HTMLButtonElement>(null);

  useModalEffects(isOpen, onClose, okRef.current);

  return createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      aria-describedby="checkout-desc"
      data-checkout-dialog-open={isOpen}
      onPointerDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.dialog}>
        <h2
          id="checkout-title"
          className={clsx(styles.dialog__heading, "title--lg")}
        >
          {t("checkout")}
        </h2>

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
          onClick={onClear}
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
          className={styles.dialog__cancel}
          onClick={onClose}
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

export default CheckoutDialog;
