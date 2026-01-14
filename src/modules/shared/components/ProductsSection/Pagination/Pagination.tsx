import clsx from "clsx";
import type { TFunction } from "i18next";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Icon from "@/layout/shared/components/Icon";
import { INITIAL_PAGE } from "../constants";
import { generatePages } from "./generatePages";
import styles from "./Pagination.module.scss";
import type { PageItem } from "./pageItem";

interface PaginationProps {
  paginationRef: React.RefObject<HTMLElement | null>;
  t: TFunction;
  sectionHeading: string;
  currentPage: number;
  totalPages: number;
  lastInputType: React.RefObject<"pointer" | "keyboard" | null>;
}

const Pagination: React.FC<PaginationProps> = ({
  paginationRef,
  t,
  sectionHeading,
  currentPage,
  totalPages,
  lastInputType,
}) => {
  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const visiblePageNumbers = generatePages(currentPage, totalPages);

  const isFirstPage = currentPage === INITIAL_PAGE;
  const isLastPage = currentPage === totalPages;

  const getSearchPage = (val: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", val.toString());

    return { search: params.toString() };
  };

  const handleInputType = (type: "pointer" | "keyboard") => {
    lastInputType.current = type;
  };

  return (
    <nav
      aria-label={t("paginationLabel", { product: t(sectionHeading) })}
      className={styles.pagination}
      ref={paginationRef}
    >
      <Link
        to={isFirstPage ? { search: search } : getSearchPage(currentPage - 1)}
        className={styles.pagination__prev}
        aria-label={t("prevPageLabel")}
        aria-disabled={isFirstPage}
        tabIndex={isFirstPage ? -1 : undefined}
        onPointerDown={() => !isFirstPage && handleInputType("pointer")}
        onKeyDown={() => handleInputType("keyboard")}
      >
        <Icon>
          <path d="m15 18-6-6 6-6" />
        </Icon>
      </Link>

      <ol className={styles.pagination__list}>
        {visiblePageNumbers.map((page: PageItem) =>
          typeof page.value === "number" ? (
            <li key={page.id}>
              <Link
                to={getSearchPage(page.value)}
                className={clsx(styles.pagination__item, {
                  [styles.active]: page.value === currentPage,
                })}
                aria-current={page.value === currentPage ? "page" : undefined}
                onPointerDown={() => {
                  if (page.value !== currentPage) {
                    handleInputType("pointer");
                  }
                }}
                onKeyDown={() => {
                  if (page.value !== currentPage) {
                    handleInputType("keyboard");
                  }
                }}
              >
                <span className="sr-only">{t("linkPageLabel")}</span>
                {page.value}
              </Link>
            </li>
          ) : (
            <li
              key={page.id}
              className={styles.pagination__ellipsis}
              aria-hidden="true"
            >
              {page.value}
            </li>
          ),
        )}
      </ol>

      <Link
        to={isLastPage ? { search: search } : getSearchPage(currentPage + 1)}
        className={styles.pagination__next}
        aria-label={t("nextPageLabel")}
        aria-disabled={isLastPage}
        tabIndex={isLastPage ? -1 : undefined}
        onPointerDown={() => !isLastPage && handleInputType("pointer")}
        onKeyDown={() => handleInputType("keyboard")}
      >
        <Icon>
          <path d="m9 18 6-6-6-6" />
        </Icon>
      </Link>
    </nav>
  );
};

export default Pagination;
