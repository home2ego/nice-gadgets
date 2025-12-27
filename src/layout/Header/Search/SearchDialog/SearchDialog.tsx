import clsx from "clsx";
import type { TFunction } from "i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import Icon from "@/layout/shared/components/Icon";
import { useModalEffects } from "@/layout/shared/hooks/useModalEffects";
import type { Category } from "@/layout/shared/types/category";
import { getProductsByCategory } from "@/layout/shared/utils/getProductsByCategory";
import styles from "./SearchDialog.module.scss";

function highlightMatch(text: string, normalizedQuery: string) {
  if (!normalizedQuery) return text;

  const index = text.toLowerCase().indexOf(normalizedQuery);
  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + normalizedQuery.length);
  const after = text.slice(index + normalizedQuery.length);

  return (
    <>
      {before}
      <strong className={styles.match}>{match}</strong>
      {after}
    </>
  );
}

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
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useModalEffects(isOpen, onClose, searchInputRef.current);

  const products = useMemo(
    () => getProductsByCategory(categoryKey),
    [categoryKey],
  );

  const normalizedQuery = query.trim().toLowerCase();

  const visibleProducts = normalizedQuery
    ? products
        .filter((product) =>
          product.name.toLowerCase().includes(normalizedQuery),
        )
        .slice(0, 10)
    : [];

  const isExpanded = visibleProducts.length > 0;

  useEffect(() => {
    setSelectedIndex((prev) => (prev >= visibleProducts.length ? -1 : prev));
  }, [visibleProducts.length]);

  const handleClearClick = () => {
    setQuery("");
    searchInputRef.current?.focus();
  };

  const handleToggleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!visibleProducts.length) return;

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();

        setSelectedIndex((prev) =>
          prev >= 0 ? (prev + 1) % visibleProducts.length : 0,
        );
        break;
      }

      case "ArrowUp": {
        e.preventDefault();

        setSelectedIndex((prev) =>
          prev >= 0
            ? (prev - 1 + visibleProducts.length) % visibleProducts.length
            : visibleProducts.length - 1,
        );
        break;
      }

      case "Enter": {
        e.preventDefault();

        if (selectedIndex >= 0) {
          optionRefs.current[selectedIndex]?.click();
        }
        break;
      }
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
      aria-describedby="search-desc"
      className={styles.dialog}
      data-search-dialog-open={isOpen}
    >
      <div className={styles.dialog__wrapper}>
        <h2
          id="search-title"
          className={clsx(styles.dialog__heading, "title--lg")}
        >
          {t("searchHeading")}
        </h2>

        <p id="search-desc" className="sr-only">
          {t("searchDescription")}
        </p>

        <div className={styles.dialog__field}>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              role="combobox"
              type="text"
              inputMode="search"
              name="search"
              aria-label={t(`search.${categoryKey}`)}
              aria-haspopup="listbox"
              aria-expanded={isExpanded}
              aria-controls="search-results"
              aria-activedescendant={
                selectedIndex >= 0 ? `option-${selectedIndex}` : undefined
              }
              placeholder={t(`search.${categoryKey}`)}
              className={clsx(styles.dialog__search, "text--search")}
              spellCheck="false"
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="off"
              maxLength={50}
              ref={searchInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleToggleKey}
            />
          </form>

          {isExpanded && (
            <ul
              id="search-results"
              // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: valid ARIA listbox usage
              role="listbox"
              aria-label={t("searchResults")}
              className={styles.products}
            >
              {visibleProducts.map((product, idx) => (
                <li key={product.itemId} role="presentation">
                  <Link
                    id={`option-${idx}`}
                    role="option"
                    aria-selected={selectedIndex === idx}
                    tabIndex={-1}
                    to={`/product/${product.itemId}`}
                    className={clsx(styles.product, "text--body")}
                    ref={(el) => {
                      optionRefs.current[idx] = el;
                    }}
                  >
                    {highlightMatch(product.name, normalizedQuery)}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {query && (
            <button
              type="button"
              aria-label={t("clearSearchLabel")}
              className={styles.dialog__clear}
              onClick={handleClearClick}
            >
              <Icon width="20" height="20">
                <path d="M18 6 6 18M6 6l12 12" />
              </Icon>
            </button>
          )}
        </div>

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
      </div>
    </div>,
    document.getElementById("root") as HTMLElement,
  );
};

export default SearchDialog;
