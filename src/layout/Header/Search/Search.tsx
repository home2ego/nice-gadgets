import type { TFunction } from "i18next";
import { useEffect, useRef, useState } from "react";
import Icon from "@/layout/shared/components/Icon";
import type { Category } from "@/layout/shared/types/category";
import styles from "./Search.module.scss";
import SearchDialog from "./SearchDialog";

interface SearchProps {
  t: TFunction;
  categoryKey: Category;
  isDesktop?: boolean;
}

const Search: React.FC<SearchProps> = ({ t, categoryKey, isDesktop }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const prevIsDialogOpen = useRef(isDialogOpen);

  useEffect(() => {
    if (prevIsDialogOpen.current && !isDialogOpen) {
      searchBtnRef.current?.focus();
    }

    prevIsDialogOpen.current = isDialogOpen;
  }, [isDialogOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={t("openSearchLabel")}
        aria-haspopup="dialog"
        className={styles.search}
        onClick={() => setIsDialogOpen(true)}
        ref={searchBtnRef}
      >
        <Icon>
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </Icon>
      </button>

      <SearchDialog
        key={categoryKey}
        t={t}
        categoryKey={categoryKey}
        isDesktop={isDesktop}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default Search;
