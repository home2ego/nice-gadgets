import clsx from "clsx";
import type { TFunction } from "i18next";
import { useRef } from "react";
import { createPortal } from "react-dom";
import Icon from "@/layout/shared/components/Icon";
import { useModalEffects } from "@/layout/shared/hooks/useModalEffects";
import type { Category } from "@/layout/shared/types/category";
import styles from "./SearchDialog.module.scss";

interface DialogProps {
  t: TFunction;
  categoryKey: Category;
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog: React.FC<DialogProps> = ({
  t,
  categoryKey,
  isOpen,
  onClose,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useModalEffects(isOpen, onClose, searchInputRef.current);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
      aria-describedby="search-desc"
      className={styles.dialog}
      data-search-dialog-open={isOpen}
    >
      <form
        className={styles.dialog__form}
        onSubmit={(e) => e.preventDefault()}
      >
        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <h2
          id="search-title"
          className={clsx(styles.dialog__heading, "title--lg")}
        >
          {t("searchHeading")}
        </h2>

        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <p id="search-desc" className="sr-only">
          {t("searchDescription")}
        </p>

        <input
          type="search"
          aria-label={t(`search.${categoryKey}`)}
          placeholder={t(`search.${categoryKey}`)}
          className={clsx(styles.dialog__search, "text--btn")}
          spellCheck="false"
          autoComplete="off"
          maxLength={50}
          ref={searchInputRef}
        />

        <button
          type="button"
          aria-label={t("closeSearchLabel")}
          className={styles.dialog__close}
          onClick={onClose}
        >
          <Icon width="24" height="24">
            <path d="M18 6 6 18M6 6l12 12" />
          </Icon>
        </button>
      </form>
    </div>,
    document.getElementById("root") as HTMLElement,
  );
};

export default SearchDialog;
