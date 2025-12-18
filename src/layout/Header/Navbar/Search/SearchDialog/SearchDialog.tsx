import clsx from "clsx";
import { useRef } from "react";
import { createPortal } from "react-dom";
import Icon from "@/layout/shared/components/Icon";
import { useModalEffects } from "@/layout/shared/hooks/useModalEffects";
import styles from "./SearchDialog.module.scss";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog: React.FC<DialogProps> = ({ isOpen, onClose }) => {
  const searchRef = useRef<HTMLInputElement>(null);

  useModalEffects(isOpen, onClose, searchRef.current);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
      className={styles.dialog}
      data-search-dialog-open={isOpen}
    >
      <div className={styles.dialog__wrapper}>
        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <h2
          id="search-title"
          className={clsx(styles.dialog__heading, "title--lg")}
        >
          Search:
        </h2>

        <input
          name="sarch"
          type="search"
          placeholder="Search for products"
          className={clsx(styles.dialog__search, "text--btn")}
          ref={searchRef}
        />

        <button
          type="button"
          className={styles.dialog__close}
          onClick={onClose}
        >
          <Icon width="24" height="24">
            <path d="M18 6 6 18M6 6l12 12" />
          </Icon>
        </button>
      </div>
    </div>,
    document.getElementById("root") as HTMLElement,
  );
};

export default SearchDialog;
