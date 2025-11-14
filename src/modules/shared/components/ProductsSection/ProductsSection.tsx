import clsx from "clsx";
import type { TFunction } from "i18next";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { focusElement } from "@/layout/shared/utils/focusElement";
import type { Product } from "../../types/product";
import type { PageOption, SortOption } from "../../types/select";
import ProductCard from "../ProductCard";
import SkipLink from "../SkipLink";
import {
  INITIAL_PAGE,
  INITIAL_PER_PAGE,
  INITIAL_SORT,
  LOAD_STEP,
} from "./constants";
import { getSortedProducts } from "./getSortedProducts";
import Pagination from "./Pagination";
import styles from "./ProductsSection.module.scss";
import Select from "./Select";

const sortOptions: SortOption[] = ["newest", "alpha", "cheapest"];
const pageOptions: PageOption[] = ["all", "4", "8", "16"];

interface ProductsProps {
  t: TFunction;
  sectionHeading: string;
  noProducts: string;
  countModels: number;
  products: Product[];
  footerRef: React.RefObject<HTMLElement | null>;
  normalizedLang: string;
}

const ProductsSection: React.FC<ProductsProps> = ({
  t,
  sectionHeading,
  noProducts,
  countModels,
  products,
  footerRef,
  normalizedLang,
}) => {
  const [searchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(LOAD_STEP);
  const prevVisibleCount = useRef<number | null>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const dropdownsRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLElement>(null);
  const loadBtnRef = useRef<HTMLButtonElement>(null);
  const focusLoadMore = useRef(false);
  const lastInputType = useRef<"pointer" | "keyboard">(null);
  const regionId = useId();

  const currentSort = searchParams.get("sort") || INITIAL_SORT;
  const currentPage = +(searchParams.get("page") || INITIAL_PAGE);
  const currentPerPage = searchParams.get("perPage") || INITIAL_PER_PAGE;

  // biome-ignore lint/correctness/useExhaustiveDependencies: currentPage intentionally included
  useLayoutEffect(() => {
    if (lastInputType.current === "pointer") {
      lastInputType.current = null;
      dropdownsRef.current?.scrollIntoView({
        block: "start",
        behavior: "instant",
      });
    }
  }, [currentPage]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: currentPage intentionally included
  useEffect(() => {
    if (lastInputType.current === "keyboard") {
      lastInputType.current = null;
      dropdownsRef.current?.scrollIntoView({ block: "start" });

      if (productsRef.current) {
        focusElement(productsRef.current);
      }
    }
  }, [currentPage]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: currentSort intentionally included
  useEffect(() => {
    if (currentPerPage === "all") {
      prevVisibleCount.current = null;
      setVisibleCount(LOAD_STEP);
    }
  }, [currentPerPage, currentSort]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: visibleCount intentionally included
  useEffect(() => {
    if (!prevVisibleCount.current || !focusLoadMore.current) return;

    const links =
      productsRef.current?.querySelectorAll<HTMLAnchorElement>("article a");

    if (!links || links.length === 0) return;

    const nextLink = links[prevVisibleCount.current];

    nextLink.focus({ preventScroll: true });
    nextLink.scrollIntoView({ block: "start" });
    focusLoadMore.current = false;
  }, [visibleCount]);

  const sortedProducts = useMemo(
    () => getSortedProducts(products, currentSort as SortOption),
    [products, currentSort],
  );

  const hasPagination = currentPerPage !== "all";
  const perPage = hasPagination ? +currentPerPage : visibleCount;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleProducts: Product[] = sortedProducts.slice(startIndex, endIndex);
  const hasLoadMore = visibleProducts.length < countModels;

  const handleLoadMorePointer = () => {
    prevVisibleCount.current = visibleCount;
    setVisibleCount((prev) => Math.min(prev + LOAD_STEP, countModels));
  };

  const handleLoadMoreKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      focusLoadMore.current = true;
      handleLoadMorePointer();
    }
  };

  const getTargetRef = () => {
    if (hasPagination) {
      return paginationRef;
    }

    if (hasLoadMore) {
      return loadBtnRef;
    }

    return footerRef;
  };

  return (
    <section aria-labelledby={regionId}>
      <h1 id={regionId} className={clsx(styles.heading, "title--xl")}>
        {t(sectionHeading)}
      </h1>

      <p className={clsx(styles.models, "text--body")}>
        {t("countModels", { count: countModels })}
      </p>

      <div className={styles.dropdowns} ref={dropdownsRef}>
        <Select
          t={t}
          label="sortLabel"
          options={sortOptions}
          paramKey="sort"
          initialParamVal={INITIAL_SORT}
        />

        <Select
          t={t}
          label="pageLabel"
          options={pageOptions}
          paramKey="perPage"
          initialParamVal={INITIAL_PER_PAGE}
        />
      </div>

      {visibleProducts.length === 0 && (
        <h2 className="title--md">{t(noProducts)}</h2>
      )}

      {visibleProducts.length > 0 && (
        <div style={{ position: "relative" }} ref={productsRef}>
          <SkipLink
            content="skipForwardProducts"
            classAttr="skip-forward-products"
            elementRef={getTargetRef()}
          />

          <ul className={styles.products}>
            {visibleProducts.map((product, idx) => (
              <li key={product.id}>
                <ProductCard
                  t={t}
                  product={product}
                  totalProducts={products.length}
                  productIdx={idx}
                  loading={idx < 12 ? "eager" : "lazy"}
                  hasOnlyFullPrice={false}
                  normalizedLang={normalizedLang}
                />
              </li>
            ))}
          </ul>

          <SkipLink
            content="skipBackProducts"
            classAttr="skip-back-products"
            topElementRef={productsRef}
          />
        </div>
      )}

      {!hasPagination && hasLoadMore && visibleProducts.length > 0 && (
        <>
          <p className={clsx(styles["progress-info"], "text--body")}>
            {t("seenModels", {
              visibleCount: visibleCount,
              totalCount: countModels,
            })}
          </p>

          <button
            type="button"
            className={clsx(styles["load-more"], "text--uppercase")}
            onPointerDown={handleLoadMorePointer}
            onKeyDown={handleLoadMoreKey}
            ref={loadBtnRef}
          >
            {t("loadMore")}
          </button>
        </>
      )}

      {hasPagination && visibleProducts.length > 0 && (
        <Pagination
          paginationRef={paginationRef}
          t={t}
          sectionHeading={sectionHeading}
          currentPage={currentPage}
          totalPages={Math.ceil(countModels / perPage)}
          lastInputType={lastInputType}
        />
      )}
    </section>
  );
};

export default ProductsSection;
