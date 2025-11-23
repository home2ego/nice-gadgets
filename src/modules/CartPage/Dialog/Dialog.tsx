import clsx from "clsx";
import type { TFunction } from "i18next";
import styles from "./Dialog.module.scss";

interface DialogProps {
  t: TFunction;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}

const Dialog: React.FC<DialogProps> = ({ t, dialogRef }) => {
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;

    if (!dialog || e.target !== dialog) {
      return;
    }

    const rect = dialog.getBoundingClientRect();

    const clickedInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.bottom &&
      rect.left <= e.clientX &&
      e.clientX <= rect.right;

    if (!clickedInDialog) {
      dialog?.close();
    }
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Native dialog handles keyboard (Esc) automatically
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="not-available-title"
      aria-describedby="not-available-desc"
      onClick={handleDialogClick}
    >
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
        onClick={() => dialogRef.current?.close()}
      >
        OK
      </button>
    </dialog>
  );
};

export default Dialog;
