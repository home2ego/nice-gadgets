import clsx from "clsx";
import { Link } from "react-router-dom";
import { generatePages } from "./generatePages";
import styles from "./Pagination.module.scss";
import type { PageItem } from "./pageItem";

interface PaginationProps {
  currentPage: number;
  perPage: number;
  totalProducts: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  perPage,
  totalProducts,
}) => {
  const totalPages = Math.ceil(totalProducts / perPage);
  const visiblePageNumbers = generatePages(currentPage, totalPages);

  return (
    <nav className={styles.pagination}>
      <Link
        to="/"
        className={clsx(styles.pagination__prev, styles.disabled)}
        aria-hidden="true"
        tabIndex={-1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          stroke="var(--text-color-primary)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </Link>

      <ol className={styles.pagination__list}>
        {visiblePageNumbers.map((page: PageItem) =>
          typeof page.value === "number" ? (
            <li key={page.id}>
              <Link
                to="/"
                className={clsx(styles.pagination__item, {
                  [styles.active]: page.value === currentPage,
                })}
                aria-current={page.value === currentPage ? "page" : undefined}
              >
                <span className={styles.hovered}>{page.value}</span>
              </Link>
            </li>
          ) : (
            <li key={page.id} className={styles.pagination__ellipsis}>
              {page.value}
            </li>
          ),
        )}
      </ol>

      <Link to="/" className={styles.pagination__next}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          stroke="var(--text-color-primary)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </Link>
    </nav>
  );
};

export default Pagination;
